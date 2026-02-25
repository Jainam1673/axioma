import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

export type ClientInsert = Database['public']['Tables']['clients']['Insert']
export type ClientRow = Database['public']['Tables']['clients']['Row']

export async function getClients(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('clients')
        .select('*')
        .eq('company_id', companyId)
}

export async function createClientRecord(supabase: SupabaseClient<Database>, data: ClientInsert) {
    return await supabase
        .from('clients')
        .insert([data])
        .select()
        .single()
}
