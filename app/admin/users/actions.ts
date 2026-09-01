"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
export type InvitationState = { ok: boolean; message: string };
export async function inviteAdministrator(_previous: InvitationState, formData: FormData): Promise<InvitationState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, message: "Enter a valid email address." };
  const supabase = await createSupabaseServerClient(); const admin = createSupabaseAdminClient();
  if (!supabase || !admin) return { ok: false, message: "Invitation service is not configured." };
  const { data: { user } } = await supabase.auth.getUser(); if (!user) return { ok: false, message: "Please sign in again." };
  const { data: role, error: roleError } = await supabase.rpc("rooted_in_christ_member_role");
  if (roleError || role !== "owner") return { ok: false, message: "Only the ministry owner can invite administrators." };
  const { data: invited, error } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: "https://www.rootedinchristmin.com/admin/login",
  });
  if (error || !invited.user) return { ok: false, message: `We could not send the invitation: ${error?.message || "Supabase returned no invited user."}` };
  const { error: membershipError } = await admin.schema("rooted_in_christ").from("members").upsert({ user_id: invited.user.id, role: "ministry_admin", status: "invited" }, { onConflict: "user_id" });
  return membershipError ? { ok: false, message: `Invitation sent, but membership could not be recorded: ${membershipError.message}` } : { ok: true, message: "Administrator invitation sent." };
}
