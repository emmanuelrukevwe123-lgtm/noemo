import { DashboardView } from "@/components/app/dashboard-view";
import { listTrades } from "@/lib/db/trades";
import { requireUser } from "@/lib/supabase/auth";

export default async function AppDashboardPage() {
  const { user } = await requireUser();
  const trades = await listTrades(user.id);

  return <DashboardView trades={trades} />;
}
