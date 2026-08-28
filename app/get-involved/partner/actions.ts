"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export type PartnerState = { ok: boolean; message: string };
export async function submitPartner(_previous: PartnerState, formData: FormData): Promise<PartnerState> {
  const organisationName = String(formData.get("organisation_name") || "").trim(); const contactName = String(formData.get("contact_name") || "").trim(); const email = String(formData.get("email") || "").trim(); const partnershipType = String(formData.get("partnership_type") || "").trim(); const area = String(formData.get("area_of_interest") || "").trim(); const message = String(formData.get("message") || "").trim();
  if (organisationName.length < 2 || organisationName.length > 160 || contactName.length < 2) return { ok: false, message: "Please enter the organisation and contact name." };
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) return { ok: false, message: "Please enter a valid email address." };
  if (!partnershipType || !area || message.length < 10 || message.length > 5000) return { ok: false, message: "Please complete the partnership details and message." };
  const supabase = await createSupabaseServerClient(); if (!supabase) return { ok: false, message: "The secure partnership service is being prepared. Please try again later." };
  const { error } = await supabase.from("partnership_enquiries").insert({ organisation_name: organisationName, contact_name: contactName, email, phone: String(formData.get("phone") || "").trim(), partnership_type: partnershipType, area_of_interest: area, message });
  return error ? { ok: false, message: "We could not submit your enquiry. Please try again later." } : { ok: true, message: "Thank you. Your partnership enquiry has been received for private review." };
}
