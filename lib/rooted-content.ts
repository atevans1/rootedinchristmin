import { createRootedSupabaseServerClient } from "@/lib/supabase/rooted";

export async function publishedRows(table: string) {
  const supabase = await createRootedSupabaseServerClient();
  if (!supabase) return [] as Record<string, unknown>[];
  const { data, error } = await supabase.from(table).select("*").eq("status", "published").order("created_at", { ascending: false });
  return error || !data ? [] : (data as Record<string, unknown>[]);
}
