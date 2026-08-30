"use server";
import { createRootedSupabaseServerClient } from "@/lib/supabase/rooted";
export type ContactState = { ok: boolean; message: string };
export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const enquiryType = String(formData.get("enquiry_type") || "general").trim();
  const message = String(formData.get("message") || "").trim();
  if (name.length < 2 || name.length > 120) return { ok: false, message: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { ok: false, message: "Please enter a valid email address." };
  if (message.length < 10 || message.length > 5000) return { ok: false, message: "Please enter a message between 10 and 5,000 characters." };
  const supabase = await createRootedSupabaseServerClient();
  if (!supabase) return { ok: false, message: "The secure contact service is being prepared. Please try again later." };
  const { error } = await supabase.from("contact_enquiries").insert({ full_name: name, email, subject: enquiryType, message });
  return error ? { ok: false, message: "We could not send your enquiry. Please try again later." } : { ok: true, message: "Thank you. Your enquiry has been received." };
}
