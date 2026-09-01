"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createRootedSupabaseServerClient } from "@/lib/supabase/rooted";
export type EventState = { ok: boolean; message: string };
export async function createEvent(_previous: EventState, formData: FormData): Promise<EventState> {
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const date = String(formData.get("event_date") || "").trim();
  if (title.length < 3 || title.length > 180 || !category || !date || description.length < 10 || description.length > 5000) return { ok: false, message: "Please provide a title, category, date, and description." };
  const supabase = await createSupabaseServerClient();
  const rooted = await createRootedSupabaseServerClient();
  if (!supabase || !rooted) return { ok: false, message: "The secure content service is being prepared. Please try again later." };
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await rooted.from("events").insert({ title, description, start_at: date, status: "published", created_by: user?.id });
  return error ? { ok: false, message: "We could not publish this event. Please check the details and try again." } : { ok: true, message: "Event published successfully." };
}
