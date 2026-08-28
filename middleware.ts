import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const access: Record<string, string[]> = {
  "/admin/users": ["super_admin"],
  "/admin/giving": ["super_admin", "administrator", "finance_manager"],
  "/admin/enquiries": ["super_admin", "administrator", "content_manager", "volunteer_manager", "beneficiary_manager"],
  "/admin/content": ["super_admin", "administrator", "content_manager", "programme_manager"],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey || request.nextUrl.pathname === "/admin/login") return response;
  const supabase = createServerClient(url, anonKey, { cookies: { getAll: () => request.cookies.getAll(), setAll(values) { values.forEach(({ name, value, options }) => { request.cookies.set(name, value); response.cookies.set(name, value, options); }); } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const matched = Object.entries(access).find(([path]) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`));
  if (matched && (!profile?.role || !matched[1].includes(profile.role))) return NextResponse.redirect(new URL("/admin/unauthorized", request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
