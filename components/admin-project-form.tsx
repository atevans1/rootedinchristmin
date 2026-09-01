"use client";
import { useActionState } from "react";
import { createProject, type ProjectState } from "@/app/admin/content/projects/actions";
const initial: ProjectState = { ok: false, message: "" };
export function AdminProjectForm() { const [state, action, pending] = useActionState(createProject, initial); return <form className="contact-form" action={action}><label>Project title<input name="title" required maxLength={160} /></label><label>Location<input name="location" /></label><label>Description<textarea name="description" required minLength={10} maxLength={5000} rows={7} /></label><button className="button" disabled={pending} type="submit">{pending ? "Saving…" : "Publish project"}</button>{state.message && <p className={state.ok ? "form-success" : "form-error"} role="status">{state.message}</p>}</form>; }
