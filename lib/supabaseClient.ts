import { createClient } from '@supabase/supabase-js';

// Access environment variables securely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // In development, we might not have these set yet, but in production this is critical.
  console.warn('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);