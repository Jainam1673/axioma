import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
export type ClientInsert = Database['public']['Tables']['clients']['Insert'];
export type ClientRow = Database['public']['Tables']['clients']['Row'];
export declare function getClients(supabase: SupabaseClient<Database>, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    client_name: string;
    client_type: string | null;
    company_id: string;
    contact_details: string | null;
    created_at: string;
    gst_number: string | null;
    id: string;
    status: string | null;
    updated_at: string;
}[]>>;
export declare function createClientRecord(supabase: SupabaseClient<Database>, data: ClientInsert): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    client_name: string;
    client_type: string | null;
    company_id: string;
    contact_details: string | null;
    created_at: string;
    gst_number: string | null;
    id: string;
    status: string | null;
    updated_at: string;
}>>;
//# sourceMappingURL=clients.d.ts.map