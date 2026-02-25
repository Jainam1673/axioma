import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

export type WithdrawalInsert = Database['public']['Tables']['partner_withdrawals']['Insert']
export type WithdrawalRow = Database['public']['Tables']['partner_withdrawals']['Row']

export async function createWithdrawal(supabase: SupabaseClient<Database>, w: WithdrawalInsert) {
    return await supabase
        .from('partner_withdrawals')
        .insert([w])
        .select()
        .single()
}

export async function getWithdrawals(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('partner_withdrawals')
        .select(`
      *,
      profiles (
        full_name,
        role
      )
    `)
        .eq('company_id', companyId)
        .order('withdrawal_date', { ascending: false })
}

export async function getPartners(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('company_id', companyId)
        .eq('role', 'Partner')
}
