"use server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export async function signInAdmin(_previous: string, formData: FormData) {
  const email = String(formData.get("email") || "").trim(); const password = String(formData.get("password") || "");
  if (!email || !password) return "Enter your email and password.";
  const supabase = await createSupabaseServerClient(); if (!supabase) return "Secure authentication is not configured yet.";
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return "The email or password could not be verified.";
  redirect("/admin");
}

export async function requestPasswordReset(_previous: string, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
  const supabase = await createSupabaseServerClient();
  if (!supabase) return "Secure authentication is not configured yet.";
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: "https://www.rootedinchristmin.com/admin/reset-password" });
  return error ? "We could not send a reset email. Please try again." : "If that account exists, a password reset email has been sent.";
}
