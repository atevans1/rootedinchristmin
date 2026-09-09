"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const tables = new Set(["posts", "gallery_items"]);
export type ContentActionState = { ok: boolean; message: string };

async function authorizedAdmin() {
  const session = await createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  if (!session || !admin) return null;
  const { data: { user } } = await session.auth.getUser();
  if (!user) return null;
  const { data: member } = await session.schema("rooted_in_christ").from("members").select("status").eq("user_id", user.id).eq("status", "active").maybeSingle();
  return member ? admin : null;
}

export async function updateContent(table: string, id: string, values: Record<string, unknown>): Promise<ContentActionState> {
  if (!tables.has(table) || !id) return { ok: false, message: "Invalid content record." };
  const admin = await authorizedAdmin();
  if (!admin) return { ok: false, message: "Your active ministry membership is required." };
  const allowed = table === "gallery_items" ? { title: values.title, caption: values.caption } : { title: values.title };
  const { error } = await admin.schema("rooted_in_christ").from(table).update(allowed).eq("id", id);
  return error ? { ok: false, message: "We could not update this content." } : { ok: true, message: "Content updated successfully." };
}

export async function deleteContent(table: string, id: string): Promise<ContentActionState> {
  if (!tables.has(table) || !id) return { ok: false, message: "Invalid content record." };
  const admin = await authorizedAdmin();
  if (!admin) return { ok: false, message: "Your active ministry membership is required." };
  let storagePath = "";
  if (table === "gallery_items") {
    const { data } = await admin.schema("rooted_in_christ").from(table).select("storage_path").eq("id", id).maybeSingle();
    storagePath = String(data?.storage_path || "");
  }
  const { error } = await admin.schema("rooted_in_christ").from(table).delete().eq("id", id);
  if (error) return { ok: false, message: "We could not delete this content." };
  if (storagePath) await admin.storage.from("ministry-media").remove([storagePath]);
  return { ok: true, message: "Content deleted successfully." };
}

export async function togglePinnedPost(id: string, pinned: boolean): Promise<ContentActionState> {
  if (!id) return { ok: false, message: "Invalid post." };
  const admin = await authorizedAdmin();
  if (!admin) return { ok: false, message: "Your active ministry membership is required." };
  const { error } = await admin.schema("rooted_in_christ").from("posts").update({ pinned }).eq("id", id);
  return error ? { ok: false, message: error.message.includes("four") ? error.message : "We could not update the pinned posts." } : { ok: true, message: pinned ? "Post pinned." : "Post unpinned." };
}