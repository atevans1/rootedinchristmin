import { createRootedSupabaseServerClient } from "@/lib/supabase/rooted";

export async function publishedRows(table: string) {
  const supabase = await createRootedSupabaseServerClient();
  if (!supabase) return [] as Record<string, unknown>[];
  const { data, error } = await supabase.from(table).select("*").eq("status", "published").order("created_at", { ascending: false });
  return error || !data ? [] : (data as Record<string, unknown>[]);
}

export async function publishedProgrammes() {
  const rows = await publishedRows("programmes");
  return rows.map((row) => ({ slug: String(row.slug || row.id), title: String(row.title || "Programme"), category: String(row.category || "Ministry programme"), summary: String(row.description || ""), description: String(row.description || ""), status: "Published" }));
}

export async function publishedProjects() {
  const rows = await publishedRows("projects");
  return rows.map((row) => ({ slug: String(row.slug || row.id), title: String(row.title || "Project"), status: "Published", summary: String(row.description || ""), location: String(row.location || ""), programme: "Rooted In Christ Ministry" }));
}

export async function publishedGalleryItems() {
  const rows = await publishedRows("gallery_items");
  return rows.map((row) => ({ title: String(row.title || "Ministry moment"), category: "Ministry gallery", state: String(row.caption || "Published ministry image"), storagePath: String(row.storage_path || "") }));
}
