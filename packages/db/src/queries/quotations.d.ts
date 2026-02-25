import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
export type QuotationInsert = Database['public']['Tables']['quotations']['Insert'];
export type QuotationRow = Database['public']['Tables']['quotations']['Row'];
export type QuotationItemInsert = Database['public']['Tables']['quotation_items']['Insert'];
export type QuotationItemRow = Database['public']['Tables']['quotation_items']['Row'];
export declare function createQuotation(supabase: SupabaseClient<Database>, quotation: QuotationInsert, items: Omit<QuotationItemInsert, 'quotation_id'>[]): Promise<{
    data: null;
    error: import("@supabase/supabase-js").PostgrestError;
} | {
    data: {
        quotation: {
            client_contact_details: string | null;
            client_gst: string | null;
            client_id: string;
            company_id: string;
            created_at: string;
            discount: number | null;
            grand_total: number | null;
            id: string;
            quotation_date: string;
            quotation_number: string;
            status: string | null;
            subtotal: number | null;
            tax: number | null;
            terms_and_conditions: string | null;
            updated_at: string;
            validity_date: string | null;
        };
        items: {
            company_id: string;
            created_at: string;
            description: string;
            id: string;
            line_total: number;
            quantity: number;
            quotation_id: string;
            unit_price: number;
        }[];
    };
    error: null;
}>;
export declare function getQuotations(supabase: SupabaseClient<Database>, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    client_contact_details: string | null;
    client_gst: string | null;
    client_id: string;
    company_id: string;
    created_at: string;
    discount: number | null;
    grand_total: number | null;
    id: string;
    quotation_date: string;
    quotation_number: string;
    status: string | null;
    subtotal: number | null;
    tax: number | null;
    terms_and_conditions: string | null;
    updated_at: string;
    validity_date: string | null;
    clients: {
        client_name: string;
    };
}[]>>;
export declare function getQuotationById(supabase: SupabaseClient<Database>, id: string, companyId: string): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<{
    client_contact_details: string | null;
    client_gst: string | null;
    client_id: string;
    company_id: string;
    created_at: string;
    discount: number | null;
    grand_total: number | null;
    id: string;
    quotation_date: string;
    quotation_number: string;
    status: string | null;
    subtotal: number | null;
    tax: number | null;
    terms_and_conditions: string | null;
    updated_at: string;
    validity_date: string | null;
    clients: {
        client_name: string;
        client_type: string | null;
        contact_details: string | null;
        gst_number: string | null;
    };
    quotation_items: {
        company_id: string;
        created_at: string;
        description: string;
        id: string;
        line_total: number;
        quantity: number;
        quotation_id: string;
        unit_price: number;
    }[];
}>>;
//# sourceMappingURL=quotations.d.ts.map