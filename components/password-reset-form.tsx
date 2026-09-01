"use client";
import { useActionState } from "react";
import { requestPasswordReset } from "@/app/admin/login/actions";
export function PasswordResetForm() { const [message, action, pending] = useActionState(requestPasswordReset, ""); return <form className="admin-login-form" action={action}><label>Email<input name="email" type="email" required autoComplete="email" /></label><button className="button" disabled={pending} type="submit">{pending ? "Sending…" : "Send password reset"}</button>{message && <p className="form-success" role="status">{message}</p>}</form>; }
