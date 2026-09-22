import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  process.env.SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  'https://supabase-control-tower-api.fbr.news';

const supabaseAnonKey = 
  process.env.SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  'anon-key-placeholder';

const targetSchema = 
  process.env.CONTROL_TOWER_SCHEMA_NAME || 
  'custom_salesengine';

/**
 * Supabase Client para operações no navegador e Client Components.
 * Opera estritamente no schema custom_salesengine provisionado pela FBR Control Tower.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: targetSchema,
  },
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
});

/**
 * Helper para obter cliente com Service Role (apenas em Server-side / API Routes / Background Workers protegidos).
 * Opera estritamente no schema custom_salesengine.
 */
export const getServiceSupabase = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada no ambiente.');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    db: {
      schema: targetSchema,
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
