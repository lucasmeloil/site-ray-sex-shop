
import { createClient } from '@supabase/supabase-js';

// As variáveis de ambiente devem ser configuradas no Netlify
// VITE_SUPABASE_URL
// VITE_SUPABASE_KEY (Anon Key)

// Safe access to environment variables
// O objeto (import.meta as any).env pode ser undefined em alguns ambientes, causando erro ao tentar acessar propriedades.
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ Supabase URL ou Key não encontradas. O modo 'Real Database' pode falhar se não configurado no .env ou Netlify."
  );
}

// Cria uma instância única do cliente para ser usada em toda a app
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder-key'
);
