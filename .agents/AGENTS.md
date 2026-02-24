AGENTS.md
Axioma

Business Financial Dashboard & Management System (SaaS)

Version: 1.0
Architecture: Vercel + Supabase + Turborepo + Bun
Database: PostgreSQL (Supabase)

1. Project Overview

Axioma is a multi-tenant SaaS-based Business Financial Dashboard & Management System designed to manage:

Quotations

Invoices

Expense tracking

Income tracking

Partner withdrawals

Client management

Automated financial reporting

Profit distribution logic

The system must support:

Strict company-level data isolation

Fully automated calculations

Role-based access

Exportable reports

Mobile-friendly interface

All financial calculations must be system-generated and database-validated.

2. Core System Principles

Multi-Tenant Architecture
Every record must contain company_id.

Financial Accuracy
All totals must be auto-calculated and verified at database level.

Secure by Default
Row Level Security (RLS) must be enabled on all business tables.

No Manual Financial Override
Users cannot directly edit computed totals.

Cloud-Native
Hosted on Vercel with Supabase backend.

3. Core Modules (Complete Feature Coverage)
3.1 Quotation Module
Required Fields

quotation_number (Auto-generated)

quotation_date

client_id

client_contact_details

client_gst

multiple line items:

description

quantity

unit_price

line_total (auto-calculated)

subtotal (auto-calculated)

discount (optional)

tax (GST if applicable)

grand_total (auto-calculated)

terms_and_conditions

validity_date

authorized_signature_section

status (Draft / Approved / Converted)

company_id

Calculation Rules

line_total = quantity × unit_price
subtotal = sum(line_total)
grand_total = subtotal - discount + tax

Quotation numbers must auto-increment per company.

3.2 Invoice Module

Invoice can be:

Generated from approved quotation
OR

Created manually

Required Fields

invoice_number (Auto-generated)

invoice_date

client_id

linked_quotation_id (optional)

line items:

description

quantity

unit_price

line_total

subtotal

tax

discount

grand_total

payment_status (Paid / Partial / Pending)

payment_platform (UPI / Bank Transfer / Cash / Card / Other)

transaction_reference_number

payment_date

outstanding_balance (auto-calculated)

company_id

Calculation Rules

outstanding_balance = grand_total - total_payments_received

payment_status logic:

0 balance → Paid

Partial payment → Partial

No payment → Pending

Invoice numbers auto-increment per company.

3.3 Expense Management Module
Required Fields

expense_date

category (Rent, Wi-Fi, Electricity, Software, Marketing, Travel, Equipment, Misc)

sub_category (optional)

vendor_name

description

payment_method (UPI / Bank Transfer / Cash / Card)

amount

receipt_upload (Supabase Storage)

recurring (Yes / No)

linked_month

company_id

Recurring expenses must be identifiable in reports.

3.4 Income Tracking Module

Tracks incoming payments from clients.

Required Fields

income_date

client_id

project_name

total_deal_value

amount_received

pending_amount (auto-calculated)

payment_platform

reference_id

payment_status

company_id

Calculation Rule

pending_amount = total_deal_value - amount_received

Payment status:

Paid

Partial

Pending

3.5 Partner Withdrawal Module

Partners may withdraw during month.

Required Fields

partner_id

withdrawal_date

amount

reason_notes

company_id

Logic

Withdrawals must:

Be included in profit calculations

Automatically reduce final partner share

3.6 Client Management Module
Required Fields

client_name

client_type (Social Media, Branding, Marketing, Development, etc.)

contact_details

gst_number

status (Active / Inactive)

company_id

Computed Fields

total_projects

total_revenue_generated

4. Financial Dashboard (Main Summary)

The dashboard must display both monthly and overall summaries.

Monthly Summary

Total Monthly Income

Total Monthly Expenses

Category-wise Expense Breakdown

Gross Profit

Partner Salaries (fixed configurable input)

Total Partner Withdrawals

Net Profit After Salaries & Withdrawals

Profit Distribution (Default 50% / 50%)

Final Payable / Receivable per Partner

Company-Level Summary

Total Company Cash Balance

Bank Balance

UPI Balance

Outstanding Client Payments

Recurring Expense Summary

Top Expense Categories

Top Revenue Clients

5. Financial Calculation Logic
Gross Profit

gross_profit = total_income - total_expenses

Net Profit

net_profit = gross_profit - partner_salaries - withdrawals

Profit Distribution

partner_share = net_profit × 50%

final_payable = partner_share - withdrawals

All calculations must use database views or SQL functions.

6. Role-Based Access

Roles:

Admin:

Full access

Modify salary settings

Export reports

Manage users

Partner:

View dashboard

Add expenses/income

Add withdrawals

View reports

All access controlled using Supabase Auth + RLS.

7. Reporting & Export

System must support:

Monthly reports

Yearly reports

Profit & Loss statements

Partner settlement sheet

Export formats:

PDF

Excel

Reports must use verified database calculations.

8. Search & Filtering

Each module must support:

Search by client

Search by date range

Filter by payment status

Filter by category

Filter by month/year

9. System Requirements

Mandatory:

All calculations automatic

Role-based login

Secure cloud database

Mobile responsive UI

Multi-tenant isolation

Secure file uploads

Indexed financial tables

UUID primary keys

10. Security Requirements

Enable Row Level Security on all tables

Enforce company_id filtering

Use database constraints (NOT NULL, FK)

No direct client-side financial overrides

Secure environment variable handling

No exposure of service role key to frontend

11. Performance Requirements

Index company_id

Index invoice_date, expense_date, income_date

Use SQL views for dashboard aggregation

Avoid large frontend aggregation logic

12. Future-Ready Expansion

Architecture must support:

Subscription billing (Stripe / Razorpay)

Multi-currency

Tax reports

Accountant role

Audit logs

API integrations

Mobile application

13. Non-Negotiable Standards

Every financial record belongs to a company.

Financial totals are system-generated only.

No manual calculation overrides.

Database integrity is critical.

System must remain scalable and cloud-native.

End of AGENTS.md
Project: Axioma
System Type: SaaS Financial Management Platform
Compliance: Full Feature Coverage as per Business Requirement Document