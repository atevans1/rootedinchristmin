"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
const tables = new Set(["contact_enquiries", "volunteer_applications", "partnership_enquiries", "donation_records", "assistance_requests"]);
export async function deleteSubmission(table: string, id: string) {
  if (!tables.has(table) || !id) return { ok: false, message: "Invalid submission." };
  const session = await createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  if (!session || !admin) return { ok: false, message: "Secure submissions are not configured." };
  const { data: { user } } = await session.auth.getUser();
  if (!user) return { ok: false, message: "Please sign in again." };
  const { data: member } = await session.schema("rooted_in_christ").from("members").select("status").eq("user_id", user.id).eq("status", "active").maybeSingle();
  if (!member) return { ok: false, message: "Your active ministry membership is required." };
  const { error } = await admin.schema("rooted_in_christ").from(table).delete().eq("id", id);
  return error ? { ok: false, message: "We could not delete this submission." } : { ok: true, message: "Submission deleted." };
}