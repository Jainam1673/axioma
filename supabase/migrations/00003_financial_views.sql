-- Financial Views for Axioma Dashboard
-- Aggregates data securely per company, relying on RLS of underlying tables

-- 1. Monthly Summary View
-- Calculates monthly income and expenses per company
CREATE OR REPLACE VIEW public.monthly_summary AS
SELECT 
    COALESCE(i.company_id, e.company_id) AS company_id,
    COALESCE(i.month, e.month) AS month,
    COALESCE(i.total_income, 0) AS total_income,
    COALESCE(e.total_expense, 0) AS total_expense,
    COALESCE(i.total_income, 0) - COALESCE(e.total_expense, 0) AS gross_profit
FROM 
    (SELECT company_id, date_trunc('month', income_date) AS month, SUM(amount_received) AS total_income 
     FROM public.income GROUP BY company_id, date_trunc('month', income_date)) i
FULL OUTER JOIN 
    (SELECT company_id, date_trunc('month', expense_date) AS month, SUM(amount) AS total_expense 
     FROM public.expenses GROUP BY company_id, date_trunc('month', expense_date)) e
ON i.company_id = e.company_id AND i.month = e.month;

-- 2. Outstanding Client Balances View
-- Aggregates unpaid invoice amounts and pending income per client
CREATE OR REPLACE VIEW public.client_outstanding_balances AS
SELECT 
    c.company_id,
    c.id AS client_id,
    c.client_name,
    COALESCE(inv.outstanding_invoice_balance, 0) + COALESCE(inc.pending_income_amount, 0) AS total_outstanding
FROM public.clients c
LEFT JOIN 
    (SELECT client_id, SUM(outstanding_balance) AS outstanding_invoice_balance 
     FROM public.invoices WHERE outstanding_balance > 0 GROUP BY client_id) inv
ON c.id = inv.client_id
LEFT JOIN 
    (SELECT client_id, SUM(pending_amount) AS pending_income_amount 
     FROM public.income WHERE pending_amount > 0 GROUP BY client_id) inc
ON c.id = inc.client_id
WHERE COALESCE(inv.outstanding_invoice_balance, 0) + COALESCE(inc.pending_income_amount, 0) > 0;

-- 3. Partner Withdrawals Summary View
CREATE OR REPLACE VIEW public.partner_withdrawals_summary AS
SELECT 
    company_id,
    partner_id,
    date_trunc('month', withdrawal_date) AS month,
    SUM(amount) AS total_withdrawn
FROM public.partner_withdrawals
GROUP BY company_id, partner_id, date_trunc('month', withdrawal_date);
