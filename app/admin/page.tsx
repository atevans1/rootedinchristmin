import Link from "next/link";
import { Icon } from "@/components/icon";

const modules = [
  ["Programmes", "Create and manage ministry programme records", "programme_manager", "/admin/content/programmes"],
  ["Projects & impact", "Track objectives, updates, and verified outcomes", "programme_manager", "/admin/content/projects"],
  ["Stories & posts", "Draft, review, and publish ministry content", "content_manager", "/admin/content/stories"],
  ["Gallery", "Manage approved ministry media", "content_manager", "/admin/content/gallery"],
  ["Volunteers", "Review applications and placement status", "volunteer_manager"],
  ["Assistance requests", "Handle sensitive requests privately", "beneficiary_manager"],
];

export default function AdminPage() {
  return <main id="main-content" className="admin-shell"><div className="admin-topbar"><div className="container admin-topbar-inner"><Link href="/" className="admin-brand"><span className="brand-mark"><Icon name="sprout" size={23} /></span><span><strong>Rooted In Christ</strong><small>Ministry administration</small></span></Link><span className="admin-status">Local foundation · Auth pending</span></div></div><div className="container admin-content"><div className="admin-heading"><div><p className="eyebrow">Administration</p><h1>Good stewardship starts with clear records.</h1><p>Manage verified ministry content and private operational records from one secure workspace.</p></div><Link href="/" className="arrow-link">View public site <Icon name="arrow" size={18} /></Link></div><div className="admin-notice"><strong>Local development mode</strong><p>Supabase authentication is not configured in this environment yet. No admin data is being displayed, and no records can be changed from this preview.</p></div><section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Workspace modules</p><h2>Ready for secure connection</h2></div><p>Each module will be protected by the role assigned to an authenticated administrator.</p></div><div className="admin-module-grid">{modules.map(([title, description, role]) => <article className="admin-module" key={title}><span className="admin-module-role">{role}</span><h3>{title}</h3><p>{description}</p><span className="module-state">Awaiting local Supabase <Icon name="arrow" size={16} /></span></article>)}</div></section></div></main>;
}
