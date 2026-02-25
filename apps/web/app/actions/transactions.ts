'use server'

import { createClient } from '@/utils/supabase/server'
import { getExpenses, createExpense, getIncome, createIncome, type ExpenseInsert, type IncomeInsert } from '@repo/db'
import { revalidatePath } from 'next/cache'

export async function fetchTransactions() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const [expensesRes, incomeRes] = await Promise.all([
        getExpenses(supabase, profile.company_id),
        getIncome(supabase, profile.company_id)
    ])

    if (expensesRes.error) throw new Error(expensesRes.error.message)
    if (incomeRes.error) throw new Error(incomeRes.error.message)

    return { expenses: expensesRes.data, income: incomeRes.data }
}

export async function addExpense(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const newExpense: ExpenseInsert = {
        company_id: profile.company_id,
        expense_date: formData.get('expense_date') as string,
        category: formData.get('category') as string,
        sub_category: formData.get('sub_category') as string,
        vendor_name: formData.get('vendor_name') as string,
        description: formData.get('description') as string,
        payment_method: formData.get('payment_method') as string,
        amount: Number(formData.get('amount')),
        recurring: formData.get('recurring') === 'true',
        linked_month: formData.get('linked_month') as string,
    }

    const { error } = await createExpense(supabase, newExpense)
    if (error) return { error: error.message }

    revalidatePath('/transactions')
    return { success: true }
}

export async function addIncome(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const dealValue = Number(formData.get('total_deal_value'))
    const received = Number(formData.get('amount_received'))

    const newIncome: IncomeInsert = {
        company_id: profile.company_id,
        client_id: formData.get('client_id') as string,
        income_date: formData.get('income_date') as string,
        project_name: formData.get('project_name') as string,
        total_deal_value: dealValue,
        amount_received: received,
        pending_amount: dealValue - received,
        payment_platform: formData.get('payment_platform') as string,
        reference_id: formData.get('reference_id') as string,
    }

    const { error } = await createIncome(supabase, newIncome)
    if (error) return { error: error.message }

    revalidatePath('/transactions')
    return { success: true }
}
