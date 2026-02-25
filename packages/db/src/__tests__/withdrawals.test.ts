import { describe, it, expect, vi } from 'vitest'
import { createWithdrawal, getWithdrawals } from '../queries/withdrawals'

vi.mock('@repo/db', () => ({
    createServerClient: vi.fn(),
}))

describe('Partner Withdrawal DB Queries', () => {
    it('should create a withdrawal record', async () => {
        const mockSupabase: any = {
            from: vi.fn(() => ({
                insert: vi.fn(() => ({
                    select: vi.fn(() => ({
                        single: vi.fn(() => ({ data: { id: 'pw1', amount: 2000 }, error: null }))
                    }))
                }))
            }))
        }

        const withdrawalData = {
            company_id: 'c1',
            partner_id: 'profile1',
            withdrawal_date: '2023-10-01',
            amount: 2000,
            reason_notes: 'Monthly Draw'
        }

        const result = await createWithdrawal(mockSupabase, withdrawalData)
        expect(result.error).toBeNull()
        expect(result.data?.amount).toBe(2000)
    })
})
