import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export type { Database };

// Environment variables must be set by the consuming application
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createBrowserClient(): SupabaseClient {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
    }
    return createClient(supabaseUrl, supabaseAnonKey);
}

export function createServerClient(): SupabaseClient {
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase Service Role Key');
    }
    return createClient(supabaseUrl, supabaseServiceKey);
}

export * from './queries/clients';
export * from './queries/quotations';
export * from './queries/invoices';
export * from './queries/transactions';
export * from './queries/withdrawals';
export * from './queries/dashboard';
