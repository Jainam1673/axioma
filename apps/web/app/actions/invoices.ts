'use server'

import { createClient } from '@/utils/supabase/server'
import { getInvoices, createInvoice, markInvoicePaid, type InvoiceInsert, type InvoiceItemInsert } from '@repo/db'
import { revalidatePath } from 'next/cache'

export async function fetchInvoices() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const { data, error } = await getInvoices(supabase, profile.company_id)
    if (error) throw new Error(error.message)

    return data
}

export async function addInvoice(formData: FormData, items: any[]) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)
    const tax = Number(formData.get('tax') || 0)
    const discount = Number(formData.get('discount') || 0)
    const grandTotal = subtotal + tax - discount

    const newInvoice: InvoiceInsert = {
        company_id: profile.company_id,
        client_id: formData.get('client_id') as string,
        linked_quotation_id: formData.get('linked_quotation_id') as string || null,
        invoice_number: invoiceNumber,
        invoice_date: new Date().toISOString().split('T')[0],
        subtotal,
        tax,
        discount,
        grand_total: grandTotal,
        outstanding_balance: grandTotal,
        total_payments_received: 0,
        payment_status: 'Pending'
    }

    const itemsToInsert: Omit<InvoiceItemInsert, 'invoice_id'>[] = items.map((item) => ({
        company_id: profile.company_id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        line_total: item.quantity * item.unitPrice
    }))

    const { error } = await createInvoice(supabase, newInvoice, itemsToInsert)
    if (error) return { error: error.message }

    revalidatePath('/invoices')
    return { success: true }
}

export async function recordPayment(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const invoiceId = formData.get('invoice_id') as string
    const amount = Number(formData.get('amount') || 0)
    const platform = formData.get('platform') as string
    const reference = formData.get('reference') as string

    if (!invoiceId || amount <= 0) return { error: 'Invalid payment data' }

    const { error } = await markInvoicePaid(supabase, invoiceId, profile.company_id, amount, platform, reference)
    if (error) return { error: error.message }

    revalidatePath('/invoices')
    return { success: true }
}
