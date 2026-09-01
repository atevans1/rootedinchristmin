"use client";
import { useActionState } from "react";
import { inviteAdministrator, type InvitationState } from "@/app/admin/users/actions";

const initial: InvitationState = { ok: false, message: "" };

export function AdminInvitationForm() {
  const [state, action, pending] = useActionState(inviteAdministrator, initial);
  return <form className="contact-form" action={action}>
    <label>Client email<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
    <button className="button" type="submit" disabled={pending}>{pending ? "Sending invitation…" : "Send administrator invitation"}</button>
    {state.message && <p className={state.ok ? "form-success" : "form-error"} role="status">{state.message}</p>}
  </form>;
}
