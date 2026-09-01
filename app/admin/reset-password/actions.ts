"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export async function updateAdminPassword(_previous: string, formData: FormData) {
  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm_password") || "");
  if (password.length < 8) return "Use at least 8 characters.";
  if (password !== confirm) return "Passwords do not match.";
  const supabase = await createSupabaseServerClient();
  if (!supabase) return "Secure authentication is not configured yet.";
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return "We could not update your password. Request a new reset email.";
  redirect("/admin/login?reset=success");
}
