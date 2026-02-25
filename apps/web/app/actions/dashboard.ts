'use server'

import { createClient } from '@/utils/supabase/server'
import {
    getMonthlySummary,
    getPartnerWithdrawalSummary,
    getClientBalances,
    getCompanyDashboardTotals
} from '@repo/db'

export async function fetchDashboardData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const companyId = profile.company_id

    // Fetch all dashboard data concurrently
    const [
        monthlySummaryRes,
        withdrawalSummaryRes,
        clientBalancesRes,
        aggregatedTotals
    ] = await Promise.all([
        getMonthlySummary(supabase, companyId),
        getPartnerWithdrawalSummary(supabase, companyId),
        getClientBalances(supabase, companyId),
        getCompanyDashboardTotals(supabase, companyId)
    ])

    if (monthlySummaryRes.error) console.error('Error fetching monthly summary:', monthlySummaryRes.error)
    if (clientBalancesRes.error) console.error('Error fetching client balances:', clientBalancesRes.error)

    return {
        monthlySummary: monthlySummaryRes.data || [],
        withdrawalSummary: withdrawalSummaryRes.data || [],
        clientBalances: clientBalancesRes.data || [],
        aggregatedTotals
    }
}
