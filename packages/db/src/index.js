"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrowserClient = createBrowserClient;
exports.createServerClient = createServerClient;
const supabase_js_1 = require("@supabase/supabase-js");
// Environment variables must be set by the consuming application
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
function createBrowserClient() {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
    }
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
}
function createServerClient() {
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase Service Role Key');
    }
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
}
__exportStar(require("./queries/clients"), exports);
__exportStar(require("./queries/quotations"), exports);
__exportStar(require("./queries/invoices"), exports);
__exportStar(require("./queries/transactions"), exports);
__exportStar(require("./queries/withdrawals"), exports);
__exportStar(require("./queries/dashboard"), exports);
