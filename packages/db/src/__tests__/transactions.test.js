"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const transactions_1 = require("../queries/transactions");
vitest_1.vi.mock('@repo/db', () => ({
    createServerClient: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)('Expense & Income DB Queries', () => {
    (0, vitest_1.it)('should create an expense', async () => {
        const mockSupabase = {
            from: vitest_1.vi.fn(() => ({
                insert: vitest_1.vi.fn(() => ({
                    select: vitest_1.vi.fn(() => ({
                        single: vitest_1.vi.fn(() => ({ data: { id: 'e1', amount: 500 }, error: null }))
                    }))
                }))
            }))
        };
        const expenseData = {
            company_id: 'c1',
            expense_date: '2023-10-01',
            category: 'Software',
            amount: 500
        };
        const result = await (0, transactions_1.createExpense)(mockSupabase, expenseData);
        (0, vitest_1.expect)(result.error).toBeNull();
        (0, vitest_1.expect)(result.data?.amount).toBe(500);
    });
    (0, vitest_1.it)('should create an income record', async () => {
        const mockSupabase = {
            from: vitest_1.vi.fn(() => ({
                insert: vitest_1.vi.fn(() => ({
                    select: vitest_1.vi.fn(() => ({
                        single: vitest_1.vi.fn(() => ({ data: { id: 'in1', amount_received: 1000 }, error: null }))
                    }))
                }))
            }))
        };
        const incomeData = {
            company_id: 'c1',
            client_id: 'client1',
            income_date: '2023-10-01',
            project_name: 'Website',
            total_deal_value: 2000,
            amount_received: 1000,
            pending_amount: 1000
        };
        const result = await (0, transactions_1.createIncome)(mockSupabase, incomeData);
        (0, vitest_1.expect)(result.error).toBeNull();
        (0, vitest_1.expect)(result.data?.amount_received).toBe(1000);
    });
});
