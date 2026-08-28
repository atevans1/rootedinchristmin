"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export type ProgrammeState = { ok: boolean; message: string };
export async function createProgramme(_previous: ProgrammeState, formData: FormData): Promise<ProgrammeState> {
  const title = String(formData.get("title") || "").trim(); const category = String(formData.get("category") || "").trim(); const description = String(formData.get("description") || "").trim();
  if (title.length < 3 || title.length > 160 || !category || description.length < 10 || description.length > 5000) return { ok: false, message: "Please provide a title, category, and description between 10 and 5,000 characters." };
  const supabase = await createSupabaseServerClient(); if (!supabase) return { ok: false, message: "The secure content service is being prepared. Please try again later." };
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("programmes").insert({ title, slug, category, description, created_by: user?.id });
  return error ? { ok: false, message: "We could not save this programme. Please check the title and try again." } : { ok: true, message: "Programme saved as a draft." };
}
