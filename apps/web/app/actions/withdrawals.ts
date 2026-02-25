'use server'

import { createClient } from '@/utils/supabase/server'
import { getWithdrawals, createWithdrawal, getPartners, type WithdrawalInsert } from '@repo/db'
import { revalidatePath } from 'next/cache'

export async function fetchWithdrawals() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const { data, error } = await getWithdrawals(supabase, profile.company_id)

    if (error) throw new Error(error.message)

    return data
}

export async function fetchPartners() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const { data, error } = await getPartners(supabase, profile.company_id)

    if (error) throw new Error(error.message)

    return data
}

export async function addWithdrawal(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) throw new Error('No company profile found')

    const amount = Number(formData.get('amount'))

    const newWithdrawal: WithdrawalInsert = {
        company_id: profile.company_id,
        partner_id: formData.get('partner_id') as string,
        withdrawal_date: formData.get('withdrawal_date') as string,
        amount,
        reason_notes: formData.get('reason_notes') as string,
    }

    const { error } = await createWithdrawal(supabase, newWithdrawal)
    if (error) return { error: error.message }

    revalidatePath('/withdrawals')
    return { success: true }
}
