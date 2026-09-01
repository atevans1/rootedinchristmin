"use client";
import { useActionState } from "react";
import { updateAdminPassword } from "@/app/admin/reset-password/actions";
export function AdminPasswordResetForm() { const [message, action, pending] = useActionState(updateAdminPassword, ""); return <form className="admin-login-form" action={action}><label>New password<input name="password" type="password" minLength={8} required autoComplete="new-password" /></label><label>Confirm password<input name="confirm_password" type="password" minLength={8} required autoComplete="new-password" /></label><button className="button" disabled={pending} type="submit">{pending ? "Updating…" : "Set new password"}</button>{message && <p className="form-error" role="alert">{message}</p>}</form>; }
