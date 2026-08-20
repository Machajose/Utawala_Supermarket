import { supabase } from './supabaseClient'

export async function submitEnquiry(business, fields) {
  const { error } = await supabase
    .from('enquiries')
    .insert([{ business, fields }])

  if (error) throw error
}