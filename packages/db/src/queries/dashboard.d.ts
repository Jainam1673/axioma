import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
export declare function getMonthlySummary(supabase: SupabaseClient<Database>, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    company_id: string | null;
    gross_profit: number | null;
    month: string | null;
    total_expense: number | null;
    total_income: number | null;
}[]>>;
export declare function getPartnerWithdrawalSummary(supabase: SupabaseClient<Database>, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    company_id: string | null;
    month: string | null;
    partner_id: string | null;
    total_withdrawn: number | null;
}[]>>;
export declare function getClientBalances(supabase: SupabaseClient<Database>, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    client_id: string | null;
    client_name: string | null;
    company_id: string | null;
    total_outstanding: number | null;
}[]>>;
export declare function getCompanyDashboardTotals(supabase: SupabaseClient<Database>, companyId: string): Promise<{
    totalOutstanding: number;
    balances: {
        bank: number;
        upi: number;
        cash: number;
        totalIncomeRecorded: number;
    };
}>;
//# sourceMappingURL=dashboard.d.ts.map