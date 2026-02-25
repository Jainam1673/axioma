-- RLS Policies for Axioma
-- Applies strict company-level isolation using auth.uid() and profiles.company_id mappings

-- Helper function to get current user's company_id
CREATE OR REPLACE FUNCTION public.get_auth_company_id()
RETURNS UUID AS $$
  SELECT company_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Profiles
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Admins can view all profiles in their company
CREATE POLICY "Admins can view company profiles"
ON public.profiles FOR SELECT
USING (
  public.get_auth_company_id() = company_id 
  AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'Admin' AND p.company_id = public.profiles.company_id
  )
);

-- 2. Companies
-- Users can only view their own company
CREATE POLICY "Users can view their company"
ON public.companies FOR SELECT
USING (id = public.get_auth_company_id());

-- 3. Clients
CREATE POLICY "Company isolation for clients"
ON public.clients FOR ALL
USING (company_id = public.get_auth_company_id());

-- 4. Quotations
CREATE POLICY "Company isolation for quotations"
ON public.quotations FOR ALL
USING (company_id = public.get_auth_company_id());

-- 5. Quotation Items
CREATE POLICY "Company isolation for quotation items"
ON public.quotation_items FOR ALL
USING (company_id = public.get_auth_company_id());

-- 6. Invoices
CREATE POLICY "Company isolation for invoices"
ON public.invoices FOR ALL
USING (company_id = public.get_auth_company_id());

-- 7. Invoice Items
CREATE POLICY "Company isolation for invoice items"
ON public.invoice_items FOR ALL
USING (company_id = public.get_auth_company_id());

-- 8. Expenses
CREATE POLICY "Company isolation for expenses"
ON public.expenses FOR ALL
USING (company_id = public.get_auth_company_id());

-- 9. Income
CREATE POLICY "Company isolation for income"
ON public.income FOR ALL
USING (company_id = public.get_auth_company_id());

-- 10. Partner Withdrawals
CREATE POLICY "Company isolation for partner withdrawals"
ON public.partner_withdrawals FOR ALL
USING (company_id = public.get_auth_company_id());
