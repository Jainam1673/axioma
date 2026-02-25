'use server'

import { createClient } from '@/utils/supabase/server'
import { getQuotations, createQuotation, type QuotationInsert, type QuotationItemInsert } from '@repo/db'
import { revalidatePath } from 'next/cache'

export async function fetchQuotations() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const { data, error } = await getQuotations(supabase, profile.company_id)

    if (error) throw new Error(error.message)

    return data
}

export async function addQuotation(formData: FormData, items: any[]) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    // Generate a random quotation number for now (in production this should be sequenced)
    const quoteNumber = `QT-${Math.floor(Math.random() * 10000)}`

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)
    const tax = Number(formData.get('tax') || 0)
    const discount = Number(formData.get('discount') || 0)
    const grandTotal = subtotal + tax - discount

    const newQuotation: QuotationInsert = {
        company_id: profile.company_id,
        client_id: formData.get('client_id') as string,
        quotation_number: quoteNumber,
        quotation_date: new Date().toISOString().split('T')[0],
        subtotal,
        tax,
        discount,
        grand_total: grandTotal,
        status: 'Draft',
        terms_and_conditions: formData.get('terms') as string,
    }

    const itemsToInsert: Omit<QuotationItemInsert, 'quotation_id'>[] = items.map((item) => ({
        company_id: profile.company_id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        line_total: item.quantity * item.unitPrice
    }))

    const { error } = await createQuotation(supabase, newQuotation, itemsToInsert)

    if (error) return { error: error.message }

    revalidatePath('/quotations')
    return { success: true }
}
