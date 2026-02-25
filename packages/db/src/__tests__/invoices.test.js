"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const invoices_1 = require("../queries/invoices");
vitest_1.vi.mock('@repo/db', () => ({
    createServerClient: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)('Invoice DB Queries', () => {
    (0, vitest_1.it)('should create an invoice with items', async () => {
        const mockSupabase = {
            from: vitest_1.vi.fn((table) => {
                if (table === 'invoices') {
                    return {
                        insert: vitest_1.vi.fn(() => ({
                            select: vitest_1.vi.fn(() => ({
                                single: vitest_1.vi.fn(() => ({ data: { id: 'i1', invoice_number: 'INV-001' }, error: null }))
                            }))
                        }))
                    };
                }
                if (table === 'invoice_items') {
                    return {
                        insert: vitest_1.vi.fn(() => ({
                            select: vitest_1.vi.fn(() => ({ data: [{ id: 'ii1' }], error: null }))
                        }))
                    };
                }
            })
        };
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
        };
        const itemsData = [
            {
                company_id: 'c1',
                description: 'Web Dev',
                quantity: 1,
                unit_price: 100,
                line_total: 100
            }
        ];
        const result = await (0, invoices_1.createInvoice)(mockSupabase, invoiceData, itemsData);
        (0, vitest_1.expect)(result.error).toBeNull();
        (0, vitest_1.expect)(result.data?.invoice.id).toBe('i1');
    });
});
