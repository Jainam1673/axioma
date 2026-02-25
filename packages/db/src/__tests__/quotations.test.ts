import { describe, it, expect, vi } from 'vitest'
import { createQuotation, getQuotations, getQuotationById } from '../queries/quotations'

vi.mock('@repo/db', () => ({
    createServerClient: vi.fn(),
}))

describe('Quotation DB Queries', () => {
    it('should create a quotation with items', async () => {
        const mockSupabase: any = {
            from: vi.fn((table) => {
                if (table === 'quotations') {
                    return {
                        insert: vi.fn(() => ({
                            select: vi.fn(() => ({
                                single: vi.fn(() => ({ data: { id: 'q1', quotation_number: 'Q-001' }, error: null }))
                            }))
                        }))
                    }
                }
                if (table === 'quotation_items') {
                    return {
                        insert: vi.fn(() => ({
                            select: vi.fn(() => ({ data: [{ id: 'qi1' }], error: null }))
                        }))
                    }
                }
            })
        }

        const quotationData = {
            company_id: 'c1',
            client_id: 'client1',
            quotation_number: 'Q-001',
            quotation_date: '2023-10-01',
            subtotal: 100,
            grand_total: 100
        }
        const itemsData = [
            {
                company_id: 'c1',
                description: 'Web Dev',
                quantity: 1,
                unit_price: 100,
                line_total: 100
            }
        ]

        const result = await createQuotation(mockSupabase, quotationData, itemsData)
        expect(result.error).toBeNull()
        expect(result.data?.quotation.id).toBe('q1')
    })

    it('should get quotations list', async () => {
        const mockSupabase: any = {
            from: () => ({
                select: () => ({
                    eq: () => ({
                        order: () => ({ data: [{ id: 'q1', quotation_number: 'Q-001' }], error: null })
                    })
                })
            })
        }

        const result = await getQuotations(mockSupabase, 'c1')
        expect(result.data).toHaveLength(1)
    })

    it('should get a single quotation with items', async () => {
        const mockSupabase: any = {
            from: () => ({
                select: () => ({
                    eq: () => ({
                        single: () => ({
                            data: {
                                id: 'q1',
                                quotation_items: [{ id: 'qi1' }]
                            },
                            error: null
                        })
                    })
                })
            })
        }

        const result = await getQuotationById(mockSupabase, 'q1', 'c1')
        expect(result.data?.id).toBe('q1')
    })
})
