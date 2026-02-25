import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

export type QuotationInsert = Database['public']['Tables']['quotations']['Insert']
export type QuotationRow = Database['public']['Tables']['quotations']['Row']
export type QuotationItemInsert = Database['public']['Tables']['quotation_items']['Insert']
export type QuotationItemRow = Database['public']['Tables']['quotation_items']['Row']

export async function createQuotation(
    supabase: SupabaseClient<Database>,
    quotation: QuotationInsert,
    items: Omit<QuotationItemInsert, 'quotation_id'>[]
) {
    // First insert the quotation
    const { data: qData, error: qError } = await supabase
        .from('quotations')
        .insert([quotation])
        .select()
        .single()

    if (qError || !qData) {
        return { data: null, error: qError || new Error('Failed to create quotation') }
    }

    // Then insert the items with the new quotation ID
    const itemsToInsert: QuotationItemInsert[] = items.map((item) => ({
        ...item,
        quotation_id: qData.id,
    }))

    const { data: iData, error: iError } = await supabase
        .from('quotation_items')
        .insert(itemsToInsert)
        .select()

    if (iError) {
        return { data: null, error: iError }
    }

    return { data: { quotation: qData, items: iData }, error: null }
}

export async function getQuotations(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('quotations')
        .select(`
      *,
      clients (
        client_name
      )
    `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })
}

export async function getQuotationById(supabase: SupabaseClient<Database>, id: string, companyId: string) {
    return await supabase
        .from('quotations')
        .select(`
      *,
      clients (
        client_name,
        client_type,
        contact_details,
        gst_number
      ),
      quotation_items (*)
    `)
        .eq('id', id)
        .eq('company_id', companyId)
        .single()
}
