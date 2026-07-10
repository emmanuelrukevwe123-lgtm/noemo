import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const demoUser: User = {
  id: "00000000-0000-4000-8000-000000000001",
  app_metadata: {},
  user_metadata: { full_name: "Demo Trader" },
  aud: "authenticated",
  created_at: new Date(0).toISOString()
};

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    return { user: demoUser, demoMode: true };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return { user, demoMode: false };
}

export async function requireUser() {
  const { user, demoMode } = await getCurrentUser();
  if (!user) redirect("/login");
  return { user, demoMode };
}
