"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
export type MediaState = { ok: boolean; message: string };
export async function uploadMedia(_previous: MediaState, formData: FormData): Promise<MediaState> {
  const files = formData.getAll("files").filter((value): value is File => value instanceof File && value.size > 0);
  const baseTitle = String(formData.get("title") || "").trim(); const caption = String(formData.get("caption") || "").trim();
  if (!baseTitle || baseTitle.length > 180 || files.length === 0) return { ok: false, message: "Choose one or more images and enter a gallery title." };
  if (files.length > 20) return { ok: false, message: "Upload no more than 20 images at a time." };
  const invalid = files.find((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024);
  if (invalid) return { ok: false, message: "Use JPEG, PNG, or WebP images no larger than 5 MB each." };
  const supabase = await createSupabaseServerClient(); const admin = createSupabaseAdminClient();
  if (!supabase || !admin) return { ok: false, message: "The secure media service is being prepared. Please try again later." };
  const { data: { user } } = await supabase.auth.getUser(); if (!user) return { ok: false, message: "Please sign in again." };
  const { data: membership } = await supabase.schema("rooted_in_christ").from("members").select("status").eq("user_id", user.id).eq("status", "active").maybeSingle(); if (!membership) return { ok: false, message: "Your active ministry membership is required." };
  let published = 0;
  for (const file of files) { const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, ""); const path = `${user.id}/${crypto.randomUUID()}-${safeName}`; const { error: uploadError } = await admin.storage.from("ministry-media").upload(path, file, { contentType: file.type, upsert: false }); if (uploadError) continue; const filename = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim(); const title = files.length === 1 ? baseTitle : `${baseTitle} — ${filename || "Ministry moment"}`; const { error } = await admin.schema("rooted_in_christ").from("gallery_items").insert({ storage_path: path, title: title.slice(0, 180), caption, status: "published", created_by: user.id }); if (error) await admin.storage.from("ministry-media").remove([path]); else published += 1; }
  if (!published) return { ok: false, message: "No images could be published. Check the files and try again." };
  return { ok: true, message: `${published} image${published === 1 ? "" : "s"} published to the gallery.` };
}