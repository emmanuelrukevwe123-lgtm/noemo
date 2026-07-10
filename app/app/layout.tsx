import { AppShell } from "@/components/app/app-shell";
import { requireUser } from "@/lib/supabase/auth";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, demoMode } = await requireUser();

  return (
    <AppShell user={user} demoMode={demoMode}>
      {children}
    </AppShell>
  );
}
