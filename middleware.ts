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
  const supabase = createServerClient(url, anonKey, { cookies: { getAll: () => request.cookies.getAll(), setAll(values: Array<{ name: string; value: string; options: CookieOptions }>) { values.forEach(({ name, value, options }) => { request.cookies.set(name, value); response.cookies.set(name, value, options); }); } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));
  const { data: role } = await supabase.rpc("rooted_in_christ_member_role");
  const matched = Object.entries(access).find(([path]) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`));
  if (matched && (!role || !matched[1].includes(role))) return NextResponse.redirect(new URL("/admin/unauthorized", request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
