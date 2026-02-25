import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

export async function getMonthlySummary(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('monthly_summary')
        .select('*')
        .eq('company_id', companyId)
        .order('month', { ascending: false })
}

export async function getPartnerWithdrawalSummary(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('partner_withdrawals_summary')
        .select('*')
        .eq('company_id', companyId)
        .order('month', { ascending: false })
}

export async function getClientBalances(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('client_outstanding_balances')
        .select('*')
        .eq('company_id', companyId)
        .gt('total_outstanding', 0)
        .order('total_outstanding', { ascending: false })
}

// Additional aggregated data using database queries
export async function getCompanyDashboardTotals(supabase: SupabaseClient<Database>, companyId: string) {
    // Aggregate data not natively covered by views (e.g. lifetime totals, bank vs upi)

    // 1. Total Unpaid Client Invoices (Outstanding overall)
    const { data: unpaidInvoices } = await supabase
        .from('invoices')
        .select('outstanding_balance')
        .eq('company_id', companyId)
        .gt('outstanding_balance', 0)

    const totalOutstanding = (unpaidInvoices || []).reduce((acc, inv) => acc + (inv.outstanding_balance || 0), 0)

    // 2. Total Company Cash (simplification: total income + paid invoices - expenses - withdrawals)
    // Or fetch income by platform
    const { data: incomeRecords } = await supabase
        .from('income')
        .select('amount_received, payment_platform')
        .eq('company_id', companyId)

    const { data: invoiceRecords } = await supabase
        .from('invoices')
        .select('total_payments_received, payment_platform')
        .eq('company_id', companyId)
        .gt('total_payments_received', 0)

    let bankBalance = 0
    let upiBalance = 0
    let cashBalance = 0

    const processPayment = (amount: number, platform: string | null) => {
        if (platform === 'Bank Transfer') bankBalance += amount
        else if (platform === 'UPI') upiBalance += amount
        else cashBalance += amount // default
    }

    incomeRecords?.forEach(inc => processPayment(inc.amount_received || 0, inc.payment_platform))
    invoiceRecords?.forEach(inv => processPayment(inv.total_payments_received || 0, inv.payment_platform))

    return {
        totalOutstanding,
        balances: {
            bank: bankBalance,
            upi: upiBalance,
            cash: cashBalance,
            totalIncomeRecorded: bankBalance + upiBalance + cashBalance
        }
    }
}
