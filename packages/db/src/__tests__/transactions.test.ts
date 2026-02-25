import { describe, it, expect, vi } from 'vitest'
import { createExpense, getExpenses, createIncome, getIncome } from '../queries/transactions'

vi.mock('@repo/db', () => ({
    createServerClient: vi.fn(),
}))

describe('Expense & Income DB Queries', () => {
    it('should create an expense', async () => {
        const mockSupabase: any = {
            from: vi.fn(() => ({
                insert: vi.fn(() => ({
                    select: vi.fn(() => ({
                        single: vi.fn(() => ({ data: { id: 'e1', amount: 500 }, error: null }))
                    }))
                }))
            }))
        }

        const expenseData = {
            company_id: 'c1',
            expense_date: '2023-10-01',
            category: 'Software',
            amount: 500
        }

        const result = await createExpense(mockSupabase, expenseData)
        expect(result.error).toBeNull()
        expect(result.data?.amount).toBe(500)
    })

    it('should create an income record', async () => {
        const mockSupabase: any = {
            from: vi.fn(() => ({
                insert: vi.fn(() => ({
                    select: vi.fn(() => ({
                        single: vi.fn(() => ({ data: { id: 'in1', amount_received: 1000 }, error: null }))
                    }))
                }))
            }))
        }

        const incomeData = {
            company_id: 'c1',
            client_id: 'client1',
            income_date: '2023-10-01',
            project_name: 'Website',
            total_deal_value: 2000,
            amount_received: 1000,
            pending_amount: 1000
        }

        const result = await createIncome(mockSupabase, incomeData)
        expect(result.error).toBeNull()
        expect(result.data?.amount_received).toBe(1000)
    })
})
