import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
export type { Database };
export declare function createBrowserClient(): SupabaseClient;
export declare function createServerClient(): SupabaseClient;
export * from './queries/clients';
export * from './queries/quotations';
export * from './queries/invoices';
export * from './queries/transactions';
export * from './queries/withdrawals';
export * from './queries/dashboard';
//# sourceMappingURL=index.d.ts.map