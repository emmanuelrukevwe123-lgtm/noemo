const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      url: "https://placeholder.supabase.co",
      anonKey: "placeholder",
      configured: false
    };
  }

  return {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    configured: true
  };
}
