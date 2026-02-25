import { describe, it, expect, vi } from 'vitest'
import { createInvoice, getInvoices, getInvoiceById } from '../queries/invoices'

vi.mock('@repo/db', () => ({
    createServerClient: vi.fn(),
}))

describe('Invoice DB Queries', () => {
    it('should create an invoice with items', async () => {
        const mockSupabase: any = {
            from: vi.fn((table) => {
                if (table === 'invoices') {
                    return {
                        insert: vi.fn(() => ({
                            select: vi.fn(() => ({
                                single: vi.fn(() => ({ data: { id: 'i1', invoice_number: 'INV-001' }, error: null }))
                            }))
                        }))
                    }
                }
                if (table === 'invoice_items') {
                    return {
                        insert: vi.fn(() => ({
                            select: vi.fn(() => ({ data: [{ id: 'ii1' }], error: null }))
                        }))
                    }
                }
            })
        }

        const invoiceData = {
            company_id: 'c1',
            client_id: 'client1',
            invoice_number: 'INV-001',
            invoice_date: '2023-10-01',
            subtotal: 100,
            grand_total: 100,
            outstanding_balance: 100,
            total_payments_received: 0,
            payment_status: 'Pending'
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

        const result = await createInvoice(mockSupabase, invoiceData, itemsData)
        expect(result.error).toBeNull()
        expect(result.data?.invoice.id).toBe('i1')
    })
})
