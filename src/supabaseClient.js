import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Add a console warning if the environment variables are not set.
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_SUPABASE')) {
  console.warn('Supabase URL or Anon Key is missing or invalid. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
