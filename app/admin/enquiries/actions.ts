"use server";
import { createRootedSupabaseServerClient } from "@/lib/supabase/rooted";
const tables = new Set(["contact_enquiries", "volunteer_applications", "partnership_enquiries", "donation_records"]);
export async function deleteSubmission(table: string, id: string) { if (!tables.has(table) || !id) return { ok: false, message: "Invalid submission." }; const supabase = await createRootedSupabaseServerClient(); if (!supabase) return { ok: false, message: "Secure submissions are not configured." }; const { error } = await supabase.from(table).delete().eq("id", id); return error ? { ok: false, message: "We could not delete this submission." } : { ok: true, message: "Submission deleted." }; }
