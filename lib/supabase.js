import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

let supabase = null


if (isSupabaseConfigured) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    console.warn('Supabase environment variables are not accessible.')
  }
  
  export { supabase }
  
  export const getSupabase = () => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please check your environment variables.')
    }
    return supabase
  }