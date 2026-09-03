"use client";
import { useActionState } from "react";
import { uploadMedia, type MediaState } from "@/app/admin/content/gallery/actions";
const initial: MediaState = { ok: false, message: "" };
export function AdminMediaForm() { const [state, action, pending] = useActionState(uploadMedia, initial); return <form className="contact-form" action={action} encType="multipart/form-data"><label>Title<input name="title" required maxLength={180} /></label><label>Image<input name="file" type="file" accept="image/jpeg,image/png,image/webp" required /></label><label>Caption<textarea name="caption" rows={4} maxLength={500} /></label><button className="button" disabled={pending} type="submit">{pending ? "Uploading…" : "Publish to gallery"}</button>{state.message && <p className={state.ok ? "form-success" : "form-error"} role="status">{state.message}</p>}</form>; }
