import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

export type ExpenseInsert = Database['public']['Tables']['expenses']['Insert']
export type ExpenseRow = Database['public']['Tables']['expenses']['Row']
export type IncomeInsert = Database['public']['Tables']['income']['Insert']
export type IncomeRow = Database['public']['Tables']['income']['Row']

export async function createExpense(supabase: SupabaseClient<Database>, expense: ExpenseInsert) {
    return await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single()
}

export async function getExpenses(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('expenses')
        .select('*')
        .eq('company_id', companyId)
        .order('expense_date', { ascending: false })
}

export async function createIncome(supabase: SupabaseClient<Database>, income: IncomeInsert) {
    // Determine payment status based on pending_amount
    let status = 'Pending'
    if (income.pending_amount <= 0) status = 'Paid'
    else if (income.amount_received > 0) status = 'Partial'

    const incomeWithStatus = {
        ...income,
        payment_status: status
    }

    return await supabase
        .from('income')
        .insert([incomeWithStatus])
        .select()
        .single()
}

export async function getIncome(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('income')
        .select(`
      *,
      clients (
        client_name
      )
    `)
        .eq('company_id', companyId)
        .order('income_date', { ascending: false })
}
