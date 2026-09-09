"use server";
import { createRootedSupabaseServerClient } from "@/lib/supabase/rooted";
export type AssistanceState = { ok: boolean; message: string };
export async function submitAssistance(_previous: AssistanceState, formData: FormData): Promise<AssistanceState> {
  const name = String(formData.get("full_name") || "").trim(); const email = String(formData.get("email") || "").trim(); const requestType = String(formData.get("request_type") || "").trim(); const details = String(formData.get("details") || "").trim();
  if (name.length < 2 || name.length > 120 || !requestType || details.length < 10 || details.length > 5000) return { ok: false, message: "Please complete your name, request type, and details." };
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return { ok: false, message: "Please enter a valid email address." };
  const supabase = await createRootedSupabaseServerClient(); if (!supabase) return { ok: false, message: "The assistance service is being prepared. Please try again later." };
  const { error } = await supabase.from("assistance_requests").insert({ full_name: name, email: email || null, phone: String(formData.get("phone") || "").trim() || null, location: String(formData.get("location") || "").trim() || null, request_type: requestType, details });
  return error ? { ok: false, message: "We could not submit your request. Please try again later." } : { ok: true, message: "Your request has been received privately." };
}