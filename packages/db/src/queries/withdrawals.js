"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWithdrawal = createWithdrawal;
exports.getWithdrawals = getWithdrawals;
exports.getPartners = getPartners;
async function createWithdrawal(supabase, w) {
    return await supabase
        .from('partner_withdrawals')
        .insert([w])
        .select()
        .single();
}
async function getWithdrawals(supabase, companyId) {
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
        .order('withdrawal_date', { ascending: false });
}
async function getPartners(supabase, companyId) {
    return await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('company_id', companyId)
        .eq('role', 'Partner');
}
