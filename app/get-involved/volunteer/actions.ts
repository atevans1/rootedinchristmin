"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export type VolunteerState = { ok: boolean; message: string };
export async function submitVolunteer(_previous: VolunteerState, formData: FormData): Promise<VolunteerState> {
  const fullName = String(formData.get("full_name") || "").trim(); const email = String(formData.get("email") || "").trim(); const phone = String(formData.get("phone") || "").trim(); const location = String(formData.get("location") || "").trim(); const skills = String(formData.get("skills") || "").trim(); const availability = String(formData.get("availability") || "").trim(); const interest = String(formData.get("areas_of_interest") || "").trim();
  if (fullName.length < 2 || fullName.length > 120) return { ok: false, message: "Please enter your full name." };
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) return { ok: false, message: "Please enter a valid email address." };
  if (!skills || !availability || !interest) return { ok: false, message: "Please complete your skills, interests, and availability." };
  const supabase = await createSupabaseServerClient(); if (!supabase) return { ok: false, message: "The secure volunteer service is being prepared. Please try again later." };
  const { error } = await supabase.from("volunteer_applications").insert({ full_name: fullName, email, phone, location, skills, availability, areas_of_interest: interest, profession: String(formData.get("profession") || "").trim(), preferred_programme: String(formData.get("preferred_programme") || "").trim(), previous_experience: String(formData.get("previous_experience") || "").trim(), additional_notes: String(formData.get("additional_notes") || "").trim() });
  return error ? { ok: false, message: "We could not submit your application. Please try again later." } : { ok: true, message: "Thank you. Your volunteer application has been received for private review." };
}
