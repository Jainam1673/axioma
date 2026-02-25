"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const clients_1 = require("../queries/clients");
// Mock the Supabase client
vitest_1.vi.mock('@repo/db', () => {
    return {
        createServerClient: vitest_1.vi.fn(() => ({
            from: vitest_1.vi.fn((table) => {
                if (table === 'clients') {
                    return {
                        select: vitest_1.vi.fn(() => ({
                            eq: vitest_1.vi.fn((field, value) => {
                                return { data: [{ id: '1', client_name: 'Test Client', company_id: 'c1' }], error: null };
                            })
                        })),
                        insert: vitest_1.vi.fn((data) => ({
                            select: vitest_1.vi.fn(() => ({
                                single: vitest_1.vi.fn(() => ({ data: { id: '2', ...data[0] }, error: null }))
                            }))
                        }))
                    };
                }
            })
        }))
    };
});
(0, vitest_1.describe)('Client Management DB Queries', () => {
    (0, vitest_1.it)('should get clients list', async () => {
        // This will use the mocked client
        const mockSupabase = {
            from: () => ({
                select: () => ({
                    eq: () => ({ data: [{ id: '1', client_name: 'Test Client', company_id: 'c1' }], error: null })
                })
            })
        };
        const result = await (0, clients_1.getClients)(mockSupabase, 'c1');
        (0, vitest_1.expect)(result.data).toHaveLength(1);
        (0, vitest_1.expect)(result.data[0].client_name).toBe('Test Client');
    });
    (0, vitest_1.it)('should create a new client', async () => {
        const mockSupabase = {
            from: () => ({
                insert: () => ({
                    select: () => ({
                        single: () => ({ data: { id: '2', client_name: 'New Client', company_id: 'c1' }, error: null })
                    })
                })
            })
        };
        const result = await (0, clients_1.createClientRecord)(mockSupabase, { client_name: 'New Client', company_id: 'c1' });
        (0, vitest_1.expect)(result.error).toBeNull();
        (0, vitest_1.expect)(result.data.client_name).toBe('New Client');
    });
});
