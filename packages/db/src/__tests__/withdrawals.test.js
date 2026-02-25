"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const withdrawals_1 = require("../queries/withdrawals");
vitest_1.vi.mock('@repo/db', () => ({
    createServerClient: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)('Partner Withdrawal DB Queries', () => {
    (0, vitest_1.it)('should create a withdrawal record', async () => {
        const mockSupabase = {
            from: vitest_1.vi.fn(() => ({
                insert: vitest_1.vi.fn(() => ({
                    select: vitest_1.vi.fn(() => ({
                        single: vitest_1.vi.fn(() => ({ data: { id: 'pw1', amount: 2000 }, error: null }))
                    }))
                }))
            }))
        };
        const withdrawalData = {
            company_id: 'c1',
            partner_id: 'profile1',
            withdrawal_date: '2023-10-01',
            amount: 2000,
            reason_notes: 'Monthly Draw'
        };
        const result = await (0, withdrawals_1.createWithdrawal)(mockSupabase, withdrawalData);
        (0, vitest_1.expect)(result.error).toBeNull();
        (0, vitest_1.expect)(result.data?.amount).toBe(2000);
    });
});
