"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const quotations_1 = require("../queries/quotations");
vitest_1.vi.mock('@repo/db', () => ({
    createServerClient: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)('Quotation DB Queries', () => {
    (0, vitest_1.it)('should create a quotation with items', async () => {
        const mockSupabase = {
            from: vitest_1.vi.fn((table) => {
                if (table === 'quotations') {
                    return {
                        insert: vitest_1.vi.fn(() => ({
                            select: vitest_1.vi.fn(() => ({
                                single: vitest_1.vi.fn(() => ({ data: { id: 'q1', quotation_number: 'Q-001' }, error: null }))
                            }))
                        }))
                    };
                }
                if (table === 'quotation_items') {
                    return {
                        insert: vitest_1.vi.fn(() => ({
                            select: vitest_1.vi.fn(() => ({ data: [{ id: 'qi1' }], error: null }))
                        }))
                    };
                }
            })
        };
        const quotationData = {
            company_id: 'c1',
            client_id: 'client1',
            quotation_number: 'Q-001',
            quotation_date: '2023-10-01',
            subtotal: 100,
            grand_total: 100
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
        const result = await (0, quotations_1.createQuotation)(mockSupabase, quotationData, itemsData);
        (0, vitest_1.expect)(result.error).toBeNull();
        (0, vitest_1.expect)(result.data?.quotation.id).toBe('q1');
    });
    (0, vitest_1.it)('should get quotations list', async () => {
        const mockSupabase = {
            from: () => ({
                select: () => ({
                    eq: () => ({
                        order: () => ({ data: [{ id: 'q1', quotation_number: 'Q-001' }], error: null })
                    })
                })
            })
        };
        const result = await (0, quotations_1.getQuotations)(mockSupabase, 'c1');
        (0, vitest_1.expect)(result.data).toHaveLength(1);
    });
    (0, vitest_1.it)('should get a single quotation with items', async () => {
        const mockSupabase = {
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
        };
        const result = await (0, quotations_1.getQuotationById)(mockSupabase, 'q1', 'c1');
        (0, vitest_1.expect)(result.data?.id).toBe('q1');
    });
});
