TECH_STACK.md
Axioma

Production-Ready Technology Stack
Version 1.0

1. Overview

Axioma is a multi-tenant SaaS Financial Management Platform built for:

Quotations

Invoices

Expense tracking

Income tracking

Partner withdrawals

Financial dashboard & reporting

Role-based access control

Automated financial calculations

This document defines the complete, production-ready stack for deployment, scaling, and long-term maintainability.

2. Core Stack Summary

Frontend: Next.js (App Router)
Monorepo: Turborepo
Package Manager: Bun
Backend: Supabase (PostgreSQL + Auth + Storage)
Hosting: Vercel
Database: Managed PostgreSQL (Supabase)
Authentication: Supabase Auth (JWT-based)
File Storage: Supabase Storage
Reporting: Server-generated PDF & Excel
CI/CD: GitHub + Vercel Integration

3. Architecture Overview

Client (Browser)
↓
Next.js Application (Vercel)
↓
Supabase (Auth + Postgres + RLS + Storage)

No traditional backend server required at MVP stage.

Edge Functions (Supabase) may be used for:

Secure server-side calculations

Report generation

Subscription handling (future)

4. Monorepo Structure

Using Turborepo with Bun.

/apps
  /web           → Main SaaS application
  /marketing     → Public landing website

/packages
  /ui            → Shared UI components
  /types         → Shared TypeScript types
  /db            → Supabase client & queries
  /config        → Shared configs (ESLint, TSConfig)

Benefits:

Shared types across layers

Clean scalability

Production maintainability

Modular architecture

5. Frontend Stack (Production Ready)

Framework:

Next.js (App Router)

TypeScript (strict mode)

Styling:

Tailwind CSS

ShadCN UI (component system)

State Management:

React Server Components (primary)

TanStack Query (client-side data fetching where required)

Charts & Analytics:

Recharts or Tremor

Forms:

React Hook Form

Zod for validation

PDF & Excel:

Server-side generation via Edge Function or secure server route

Mobile Support:

Fully responsive UI

PWA-ready (future upgrade)

6. Backend & Database (Supabase)

Database:

PostgreSQL 15+

UUID primary keys

Foreign key constraints

Indexed financial tables

Authentication:

Supabase Auth

Email/Password

Magic link (optional)

OAuth (optional)

Authorization:

Row Level Security (RLS) on all tables

company_id-based isolation

Role-based access (Admin / Partner)

Storage:

Supabase Storage buckets:

receipts

invoices

quotations

Policies:

Strict bucket access control

Company-scoped access only

7. Multi-Tenant Strategy

Single Database
Shared Schema
Company-Level Isolation via company_id

All financial tables include:

company_id (UUID, required)

Indexed for performance

RLS policies enforce:

User can only access data where:
company_id = user's company_id

This ensures:

Data isolation

SaaS readiness

Secure scaling

8. Financial Calculation Strategy

All financial calculations must be validated at database level.

Use:

SQL Views for:

Monthly income

Monthly expense

Gross profit

Net profit

Outstanding balances

SQL Functions for:

Invoice number generation

Quotation number generation

Profit distribution logic

No financial total should rely solely on frontend calculations.

9. Security Architecture

Authentication:

JWT-based session (Supabase)

Authorization:

RLS on all business tables

Encryption:

HTTPS (Vercel default)

Secure cookies

Secrets Management:

Environment variables stored in Vercel

Service role key never exposed to frontend

Data Integrity:

NOT NULL constraints

Foreign key constraints

CHECK constraints for payment status

Backup:

Supabase automated backups

Daily snapshots enabled in production

10. Deployment Stack

Frontend Hosting:

Vercel (Production)

Auto CI/CD via GitHub

Build Settings:

Install Command: bun install

Build Command: bun run build

Root Directory: apps/web

Environment Variables:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY (server only)

Preview Deployments:

Enabled per PR

Production Domain:

Custom domain configured via Vercel

11. Performance Optimization

Database:

Index:

company_id

invoice_date

expense_date

income_date

Use materialized views if data grows significantly

Frontend:

Use Server Components where possible

Avoid heavy client-side aggregation

Use pagination for large tables

Caching:

HTTP caching for static assets

Edge caching via Vercel

12. Reporting & Export Infrastructure

Report generation strategy:

Option 1:
Server-side route using service role key

Option 2:
Supabase Edge Function

Exports:

PDF (financial statements)

Excel (detailed ledger)

Reports must pull data from database views only.

13. Monitoring & Observability

Error Tracking:

Sentry integration (recommended)

Logging:

Supabase logs

Vercel function logs

Performance Monitoring:

Vercel Analytics

Database query performance checks

14. Testing Strategy

Unit Testing:

Vitest

Component Testing:

React Testing Library

E2E Testing:

Playwright (recommended)

Database Testing:

Seed scripts for staging

Pre-Deployment Checks:

Type check

Lint

Build verification

15. Scalability Plan

Stage 1 (MVP):

Vercel + Supabase free/pro plan

Stage 2 (Growth):

Upgrade Supabase compute tier

Add Redis caching if needed

Introduce background job queue

Stage 3 (Scale):

Dedicated Postgres instance

Read replicas

Advanced analytics warehouse (optional)

16. Subscription Infrastructure (Future)

Payment Provider:

Stripe (Global)

Razorpay (India)

Subscription Model:

Monthly SaaS plan

Trial period

Company-level subscription status

Webhook handling via:

Supabase Edge Functions

17. Production Readiness Checklist

Before Launch:

RLS enabled on all tables

All financial totals validated in SQL

Backup enabled

Indexes created

Environment variables secured

Error tracking enabled

Rate limiting configured

PDF export tested

Excel export tested

Role-based access tested

Multi-tenant isolation verified

18. Non-Negotiable Production Standards

Financial integrity over speed

Database constraints enforced

No unsecured endpoints

No financial logic solely in frontend

Secure cloud-native deployment only

End of TECH_STACK.md
Project: Axioma
Status: Production-Ready Architecture
Deployment Target: SaaS Public Launch