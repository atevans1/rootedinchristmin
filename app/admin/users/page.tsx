import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminInvitationForm } from "@/components/admin-invitation-form";

export const metadata = { title: "Admin users", description: "Manage Rooted In Christ Ministry access." };

export default function AdminUsersPage() {
  return <main id="main-content" className="admin-shell">
    <div className="admin-topbar"><div className="container admin-topbar-inner"><Link href="/admin" className="admin-brand"><span className="brand-mark"><Icon name="sprout" size={23} /></span><span><strong>Rooted In Christ</strong><small>Ministry administration</small></span></Link><span className="admin-status">Owner controls</span></div></div>
    <div className="container admin-content"><Link href="/admin" className="arrow-link">Back to dashboard <Icon name="arrow" size={18} /></Link>
      <div className="admin-heading"><div><p className="eyebrow">Access control</p><h1>Invite a ministry user.</h1><p>Invite your client by email. They create their own password and receive access to Rooted In Christ content and submissions, but not account or role management.</p></div></div>
      <section className="admin-form-layout"><div><p className="eyebrow">New invitation</p><h2>Ministry user</h2><p>The invitation creates an active ministry user account. Only the Owner can invite users or manage roles.</p></div><AdminInvitationForm /></section>
      <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Access levels</p><h2>Two clear roles.</h2></div></div><div className="role-grid"><article className="role-card role-card-primary"><span>Owner role</span><h3>Owner</h3><p>Full ministry access, including inviting ministry users and managing account roles.</p></article><article className="role-card"><span>Client role</span><h3>Ministry user</h3><p>Manages published stories, gallery images, and private submissions. Cannot invite users or change account roles.</p></article></div></section>
    </div></main>;
}