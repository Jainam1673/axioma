"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClients = getClients;
exports.createClientRecord = createClientRecord;
async function getClients(supabase, companyId) {
    return await supabase
        .from('clients')
        .select('*')
        .eq('company_id', companyId);
}
async function createClientRecord(supabase, data) {
    return await supabase
        .from('clients')
        .insert([data])
        .select()
        .single();
}
