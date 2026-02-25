import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

export type InvoiceInsert = Database['public']['Tables']['invoices']['Insert']
export type InvoiceRow = Database['public']['Tables']['invoices']['Row']
export type InvoiceItemInsert = Database['public']['Tables']['invoice_items']['Insert']
export type InvoiceItemRow = Database['public']['Tables']['invoice_items']['Row']

export async function createInvoice(
    supabase: SupabaseClient<Database>,
    invoice: InvoiceInsert,
    items: Omit<InvoiceItemInsert, 'invoice_id'>[]
) {
    const { data: iData, error: iError } = await supabase
        .from('invoices')
        .insert([invoice])
        .select()
        .single()

    if (iError || !iData) {
        return { data: null, error: iError || new Error('Failed to create invoice') }
    }

    const itemsToInsert: InvoiceItemInsert[] = items.map((item) => ({
        ...item,
        invoice_id: iData.id,
    }))

    const { data: iiData, error: iiError } = await supabase
        .from('invoice_items')
        .insert(itemsToInsert)
        .select()

    if (iiError) {
        return { data: null, error: iiError }
    }

    return { data: { invoice: iData, items: iiData }, error: null }
}

export async function getInvoices(supabase: SupabaseClient<Database>, companyId: string) {
    return await supabase
        .from('invoices')
        .select(`
      *,
      clients (
        client_name
      )
    `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })
}

export async function getInvoiceById(supabase: SupabaseClient<Database>, id: string, companyId: string) {
    return await supabase
        .from('invoices')
        .select(`
      *,
      clients (
        client_name,
        client_type,
        contact_details,
        gst_number
      ),
      invoice_items (*)
    `)
        .eq('id', id)
        .eq('company_id', companyId)
        .single()
}

export async function markInvoicePaid(
    supabase: SupabaseClient<Database>,
    id: string,
    companyId: string,
    amount: number,
    platform: string,
    reference: string
) {
    const { data: invoice } = await supabase
        .from('invoices')
        .select('grand_total, total_payments_received')
        .eq('id', id)
        .eq('company_id', companyId)
        .single()

    if (!invoice) return { error: new Error('Invoice not found') }

    const newTotalReceived = (invoice.total_payments_received || 0) + amount
    const newBalance = (invoice.grand_total || 0) - newTotalReceived

    let newStatus = 'Pending'
    if (newBalance <= 0) newStatus = 'Paid'
    else if (newTotalReceived > 0) newStatus = 'Partial'

    return await supabase
        .from('invoices')
        .update({
            total_payments_received: newTotalReceived,
            outstanding_balance: newBalance,
            payment_status: newStatus,
            payment_platform: platform,
            transaction_reference_number: reference,
            payment_date: new Date().toISOString()
        })
        .eq('id', id)
        .eq('company_id', companyId)
}
