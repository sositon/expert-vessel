import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './types.js';

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
};

const getSupabaseUrl = (): string => process.env.SUPABASE_URL ?? requireEnv('NEXT_PUBLIC_SUPABASE_URL');

export const createBrowserAnonClient = (
  supabaseUrl = requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
): SupabaseClient<Database> => createClient<Database>(supabaseUrl, supabaseAnonKey);

export const createServerServiceRoleClient = (
  supabaseUrl = getSupabaseUrl(),
  serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
): SupabaseClient<Database> =>
  createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
