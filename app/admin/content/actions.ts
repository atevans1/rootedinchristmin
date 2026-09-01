"use server";
import { createRootedSupabaseServerClient } from "@/lib/supabase/rooted";

const tables = new Set(["programmes", "projects", "events", "posts", "gallery_items"]);
export type ContentActionState = { ok: boolean; message: string };

export async function updateContent(table: string, id: string, values: Record<string, unknown>): Promise<ContentActionState> {
  if (!tables.has(table) || !id) return { ok: false, message: "Invalid content record." };
  const supabase = await createRootedSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Secure content is not configured." };
  const { error } = await supabase.from(table).update(values).eq("id", id);
  return error ? { ok: false, message: "We could not update this content." } : { ok: true, message: "Content updated successfully." };
}

export async function deleteContent(table: string, id: string): Promise<ContentActionState> {
  if (!tables.has(table) || !id) return { ok: false, message: "Invalid content record." };
  const supabase = await createRootedSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Secure content is not configured." };
  const { error } = await supabase.from(table).delete().eq("id", id);
  return error ? { ok: false, message: "We could not delete this content." } : { ok: true, message: "Content deleted successfully." };
}

export async function togglePinnedPost(id: string, pinned: boolean): Promise<ContentActionState> {
  if (!id) return { ok: false, message: "Invalid post." };
  const supabase = await createRootedSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Secure content is not configured." };
  const { error } = await supabase.from("posts").update({ pinned }).eq("id", id);
  return error ? { ok: false, message: error.message.includes("four") ? error.message : "We could not update the pinned posts." } : { ok: true, message: pinned ? "Post pinned." : "Post unpinned." };
}
