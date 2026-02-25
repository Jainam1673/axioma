"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoice = createInvoice;
exports.getInvoices = getInvoices;
exports.getInvoiceById = getInvoiceById;
exports.markInvoicePaid = markInvoicePaid;
async function createInvoice(supabase, invoice, items) {
    const { data: iData, error: iError } = await supabase
        .from('invoices')
        .insert([invoice])
        .select()
        .single();
    if (iError || !iData) {
        return { data: null, error: iError || new Error('Failed to create invoice') };
    }
    const itemsToInsert = items.map((item) => ({
        ...item,
        invoice_id: iData.id,
    }));
    const { data: iiData, error: iiError } = await supabase
        .from('invoice_items')
        .insert(itemsToInsert)
        .select();
    if (iiError) {
        return { data: null, error: iiError };
    }
    return { data: { invoice: iData, items: iiData }, error: null };
}
async function getInvoices(supabase, companyId) {
    return await supabase
        .from('invoices')
        .select(`
      *,
      clients (
        client_name
      )
    `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
}
async function getInvoiceById(supabase, id, companyId) {
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
        .single();
}
async function markInvoicePaid(supabase, id, companyId, amount, platform, reference) {
    const { data: invoice } = await supabase
        .from('invoices')
        .select('grand_total, total_payments_received')
        .eq('id', id)
        .eq('company_id', companyId)
        .single();
    if (!invoice)
        return { error: new Error('Invoice not found') };
    const newTotalReceived = (invoice.total_payments_received || 0) + amount;
    const newBalance = (invoice.grand_total || 0) - newTotalReceived;
    let newStatus = 'Pending';
    if (newBalance <= 0)
        newStatus = 'Paid';
    else if (newTotalReceived > 0)
        newStatus = 'Partial';
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
        .eq('company_id', companyId);
}
