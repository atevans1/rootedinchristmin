import Link from "next/link";
import { Icon } from "@/components/icon";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const modules = [
  ["Stories & posts", "Publish ministry stories and blog posts", "ministry_user", "/admin/content/stories"],
  ["Gallery", "Publish and manage gallery images", "ministry_user", "/admin/content/gallery"],
  ["Submissions", "Review contact, volunteer, and partnership forms", "ministry_user", "/admin/enquiries"],
];

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: role } = supabase ? await supabase.rpc("rooted_in_christ_member_role") : { data: null };
  const isOwner = role === "owner" || role === "super_admin";
  const allModules = [...modules, ["Users & access", "Invite and manage Ministry users (Owner only)", "owner", "/admin/users"]];
  return <main id="main-content" className="admin-shell">
    <div className="admin-topbar"><div className="container admin-topbar-inner"><Link href="/" className="admin-brand"><span className="brand-mark"><Icon name="sprout" size={23} /></span><span><strong>Rooted In Christ</strong><small>Ministry administration</small></span></Link><nav aria-label="Admin navigation" className="admin-nav"><Link href="/admin/enquiries">Submissions</Link>{isOwner && <Link href="/admin/users">Users & access</Link>}<Link href="/admin/logout">Sign out</Link></nav><span className="admin-status">Secure workspace</span></div></div>
    <div className="container admin-content"><div className="admin-heading"><div><p className="eyebrow">Administration</p><h1>Good stewardship starts with clear records.</h1><p>Manage verified ministry content and private operational records from one secure workspace.</p></div><Link href="/" className="arrow-link">View public site <Icon name="arrow" size={18} /></Link></div>
      <div className="admin-notice"><strong>Rooted In Christ workspace</strong><p>Manage ministry content and private records from one secure workspace. New stories and images publish immediately after submission by an authorised administrator.</p></div>
      <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Workspace modules</p><h2>Manage the ministry</h2></div><p>Open a module to create, review, or maintain approved records.</p></div><div className="admin-module-grid">{allModules.map(([title, description, role, href]) => <Link href={href} className="admin-module" key={title}><span className="admin-module-role">{role}</span><h3>{title}</h3><p>{description}</p><span className="module-state">Open module <Icon name="arrow" size={16} /></span></Link>)}</div></section>
    </div></main>;
}
