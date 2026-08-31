import Link from "next/link";
import { Icon } from "@/components/icon";
import { adminRoles, roleDescriptions } from "@/lib/supabase/roles";
import { inviteAdministrator } from "./actions";

async function submitInvitation(formData: FormData): Promise<void> {
  "use server";
  await inviteAdministrator(formData);
}

export const metadata = { title: "Admin users", description: "Manage Rooted In Christ Ministry administrator roles." };

export default function AdminUsersPage() {
  return <main id="main-content" className="admin-shell">
    <div className="admin-topbar"><div className="container admin-topbar-inner"><Link href="/admin" className="admin-brand"><span className="brand-mark"><Icon name="sprout" size={23} /></span><span><strong>Rooted In Christ</strong><small>Ministry administration</small></span></Link><span className="admin-status">Owner controls</span></div></div>
    <div className="container admin-content"><Link href="/admin" className="arrow-link">Back to dashboard <Icon name="arrow" size={18} /></Link>
      <div className="admin-heading"><div><p className="eyebrow">Access control</p><h1>Invite a ministry administrator.</h1><p>Invite your client by email. They create their own password and receive access only to Rooted In Christ operations.</p></div></div>
      <section className="admin-form-layout"><div><p className="eyebrow">New invitation</p><h2>Client administrator</h2><p>The invitation assigns the <strong>ministry_admin</strong> role. Only the owner can manage roles.</p></div><form className="contact-form" action={submitInvitation}><label>Client email<input name="email" type="email" required maxLength={254} autoComplete="email" /></label><button className="button" type="submit">Send administrator invitation</button></form></section>
      <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Approved roles</p><h2>Clear responsibilities.</h2></div></div><div className="role-grid"><article className="role-card role-card-primary"><span>Owner role</span><h3>Owner</h3><p>{roleDescriptions.super_admin}</p></article>{adminRoles.map((role) => <article className="role-card" key={role}><span>Ministry role</span><h3>{role.replaceAll("_", " ")}</h3><p>{roleDescriptions[role]}</p></article>)}</div></section>
    </div></main>;
}
