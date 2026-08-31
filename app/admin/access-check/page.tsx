import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AccessCheckPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return <main id="main-content" className="admin-login-page"><div className="admin-login-card"><h1>Configuration unavailable</h1><p>The production Supabase variables are not available.</p></div></main>;
  const { data: { user } } = await supabase.auth.getUser();
  const { data: role, error } = await supabase.rpc("rooted_in_christ_member_role");
  return <main id="main-content" className="admin-login-page"><div className="admin-login-card"><p className="eyebrow">Access diagnostic</p><h1>Admin connection status</h1><p>Signed-in session: <strong>{user ? "available" : "missing"}</strong></p><p>Rooted In Christ role: <strong>{role ?? "not returned"}</strong></p><p>Role lookup: <strong>{error ? error.message : "successful"}</strong></p><Link href="/admin" className="arrow-link">Return to dashboard</Link></div></main>;
}
