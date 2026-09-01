"use client";
import { useActionState } from "react";
import { createProgramme, type ProgrammeState } from "@/app/admin/content/programmes/actions";
const initial: ProgrammeState = { ok: false, message: "" };
export function AdminProgrammeForm() { const [state, action, pending] = useActionState(createProgramme, initial); return <form className="contact-form" action={action}><label>Programme title<input name="title" required maxLength={160} /></label><label>Category<input name="category" required /></label><label>Description<textarea name="description" required minLength={10} maxLength={5000} rows={7} /></label><button className="button" disabled={pending} type="submit">{pending ? "Saving…" : "Publish programme"}</button>{state.message && <p className={state.ok ? "form-success" : "form-error"} role="status">{state.message}</p>}</form>; }
