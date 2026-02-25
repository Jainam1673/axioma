import { describe, it, expect, vi } from 'vitest'
import { getClients, createClientRecord } from '../queries/clients'

// Mock the Supabase client
vi.mock('@repo/db', () => {
    return {
        createServerClient: vi.fn(() => ({
            from: vi.fn((table) => {
                if (table === 'clients') {
                    return {
                        select: vi.fn(() => ({
                            eq: vi.fn((field, value) => {
                                return { data: [{ id: '1', client_name: 'Test Client', company_id: 'c1' }], error: null }
                            })
                        })),
                        insert: vi.fn((data) => ({
                            select: vi.fn(() => ({
                                single: vi.fn(() => ({ data: { id: '2', ...data[0] }, error: null }))
                            }))
                        }))
                    }
                }
            })
        }))
    }
})

describe('Client Management DB Queries', () => {
    it('should get clients list', async () => {
        // This will use the mocked client
        const mockSupabase: any = {
            from: () => ({
                select: () => ({
                    eq: () => ({ data: [{ id: '1', client_name: 'Test Client', company_id: 'c1' }], error: null })
                })
            })
        }

        const result = await getClients(mockSupabase, 'c1')
        expect(result.data).toHaveLength(1)
        expect(result.data![0].client_name).toBe('Test Client')
    })

    it('should create a new client', async () => {
        const mockSupabase: any = {
            from: () => ({
                insert: () => ({
                    select: () => ({
                        single: () => ({ data: { id: '2', client_name: 'New Client', company_id: 'c1' }, error: null })
                    })
                })
            })
        }
        const result = await createClientRecord(mockSupabase, { client_name: 'New Client', company_id: 'c1' })
        expect(result.error).toBeNull()
        expect(result.data!.client_name).toBe('New Client')
    })
})
