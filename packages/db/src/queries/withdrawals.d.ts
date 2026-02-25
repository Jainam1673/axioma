import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
export type WithdrawalInsert = Database['public']['Tables']['partner_withdrawals']['Insert'];
export type WithdrawalRow = Database['public']['Tables']['partner_withdrawals']['Row'];
export declare function createWithdrawal(supabase: SupabaseClient<Database>, w: WithdrawalInsert): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    amount: number;
    company_id: string;
    created_at: string;
    id: string;
    partner_id: string;
    reason_notes: string | null;
    updated_at: string;
    withdrawal_date: string;
}>>;
export declare function getWithdrawals(supabase: SupabaseClient<Database>, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    amount: number;
    company_id: string;
    created_at: string;
    id: string;
    partner_id: string;
    reason_notes: string | null;
    updated_at: string;
    withdrawal_date: string;
    profiles: {
        full_name: string;
        role: string;
    };
}[]>>;
export declare function getPartners(supabase: SupabaseClient<Database>, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    id: string;
    full_name: string;
    role: string;
}[]>>;
//# sourceMappingURL=withdrawals.d.ts.map