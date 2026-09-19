import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const requestedNext = requestUrl.searchParams.get("next") || "/admin";
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/admin";
  const response = NextResponse.redirect(new URL(next, requestUrl.origin));
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return response;
  const cookieStore = await cookies();
  const supabase = createServerClient(url, anonKey, { cookies: { getAll: () => cookieStore.getAll(), setAll(values: { name: string; value: string; options: CookieOptions }[]) { values.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); } } });
  const code = requestUrl.searchParams.get("code");
  if (code) await supabase.auth.exchangeCodeForSession(code);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  if (!code && tokenHash && type) await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type as EmailOtpType });
  return response;
}