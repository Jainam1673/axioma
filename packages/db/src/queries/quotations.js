"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuotation = createQuotation;
exports.getQuotations = getQuotations;
exports.getQuotationById = getQuotationById;
async function createQuotation(supabase, quotation, items) {
    // First insert the quotation
    const { data: qData, error: qError } = await supabase
        .from('quotations')
        .insert([quotation])
        .select()
        .single();
    if (qError || !qData) {
        return { data: null, error: qError || new Error('Failed to create quotation') };
    }
    // Then insert the items with the new quotation ID
    const itemsToInsert = items.map((item) => ({
        ...item,
        quotation_id: qData.id,
    }));
    const { data: iData, error: iError } = await supabase
        .from('quotation_items')
        .insert(itemsToInsert)
        .select();
    if (iError) {
        return { data: null, error: iError };
    }
    return { data: { quotation: qData, items: iData }, error: null };
}
async function getQuotations(supabase, companyId) {
    return await supabase
        .from('quotations')
        .select(`
      *,
      clients (
        client_name
      )
    `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
}
async function getQuotationById(supabase, id, companyId) {
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
        .single();
}
