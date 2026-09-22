import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

/**
 * Supabase Client para operações no navegador (Client Components).
 * Respeita automaticamente as políticas de Row Level Security (RLS) vinculadas ao usuário autenticado.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper para obter cliente com Service Role (apenas em Server-side / API Routes protegidas).
 * ATENÇÃO: Nunca expor NEXT_PUBLIC para esta chave!
 */
export const getServiceSupabase = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada no ambiente seguro.');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
