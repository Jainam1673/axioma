"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpense = createExpense;
exports.getExpenses = getExpenses;
exports.createIncome = createIncome;
exports.getIncome = getIncome;
async function createExpense(supabase, expense) {
    return await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();
}
async function getExpenses(supabase, companyId) {
    return await supabase
        .from('expenses')
        .select('*')
        .eq('company_id', companyId)
        .order('expense_date', { ascending: false });
}
async function createIncome(supabase, income) {
    // Determine payment status based on pending_amount
    let status = 'Pending';
    if (income.pending_amount <= 0)
        status = 'Paid';
    else if (income.amount_received > 0)
        status = 'Partial';
    const incomeWithStatus = {
        ...income,
        payment_status: status
    };
    return await supabase
        .from('income')
        .insert([incomeWithStatus])
        .select()
        .single();
}
async function getIncome(supabase, companyId) {
    return await supabase
        .from('income')
        .select(`
      *,
      clients (
        client_name
      )
    `)
        .eq('company_id', companyId)
        .order('income_date', { ascending: false });
}
