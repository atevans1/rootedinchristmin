import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

const access: Record<string, string[]> = {
  "/admin/users": ["owner"],
  "/admin/giving": ["owner", "ministry_admin"],
  "/admin/enquiries": ["owner", "ministry_admin", "pastor", "prayer_team"],
  "/admin/content": ["owner", "ministry_admin", "editor", "media_manager"],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey || request.nextUrl.pathname === "/admin/login") return response;
  const supabase = createServerClient(url, anonKey, { db: { schema: "rooted_in_christ" }, cookies: { getAll: () => request.cookies.getAll(), setAll(values: Array<{ name: string; value: string; options: CookieOptions }>) { values.forEach(({ name, value, options }) => { request.cookies.set(name, value); response.cookies.set(name, value, options); }); } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));
  const { data: membership } = await supabase.from("members").select("role,status").eq("user_id", user.id).eq("status", "active").maybeSingle();
  const matched = Object.entries(access).find(([path]) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`));
  if (matched && (!membership?.role || !matched[1].includes(membership.role))) return NextResponse.redirect(new URL("/admin/unauthorized", request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
