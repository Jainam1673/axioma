'use server'

import { createClient } from '@/utils/supabase/server'
import { getClients, createClientRecord, type ClientInsert } from '@repo/db'
import { revalidatePath } from 'next/cache'

export async function fetchClients() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    // Get user profile to find company_id
    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) {
        throw new Error('No company profile found')
    }

    const { data, error } = await getClients(supabase, profile.company_id)

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function addClient(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

    if (!profile?.company_id) {
        throw new Error('No company profile found')
    }

    const newClient: ClientInsert = {
        company_id: profile.company_id,
        client_name: formData.get('client_name') as string,
        client_type: formData.get('client_type') as string,
        contact_details: formData.get('contact_details') as string,
        gst_number: formData.get('gst_number') as string,
        status: 'Active'
    }

    const { error } = await createClientRecord(supabase, newClient)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/clients')
    return { success: true }
}
