"use client";
import { useActionState } from "react";
import { signInAdmin } from "@/app/admin/login/actions";
export function AdminLoginForm() { const [error, action, pending] = useActionState(signInAdmin, ""); return <form className="admin-login-form" action={action}><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label><button className="button" disabled={pending} type="submit">{pending ? "Signing in…" : "Sign in"}</button>{error && <p className="form-error" role="alert">{error}</p>}</form>; }
