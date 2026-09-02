import Link from "next/link";
import { Icon } from "@/components/icon";

const modules = [
  ["Stories & posts", "Publish ministry stories and blog posts", "content_manager", "/admin/content/stories"],
  ["Gallery", "Publish and manage gallery images", "content_manager", "/admin/content/gallery"],
];

export default function AdminPage() {
  return <main id="main-content" className="admin-shell">
    <div className="admin-topbar"><div className="container admin-topbar-inner"><Link href="/" className="admin-brand"><span className="brand-mark"><Icon name="sprout" size={23} /></span><span><strong>Rooted In Christ</strong><small>Ministry administration</small></span></Link><nav aria-label="Admin navigation" className="admin-nav"><Link href="/admin/users">Users</Link><Link href="/admin/logout">Sign out</Link></nav><span className="admin-status">Secure workspace</span></div></div>
    <div className="container admin-content"><div className="admin-heading"><div><p className="eyebrow">Administration</p><h1>Good stewardship starts with clear records.</h1><p>Manage verified ministry content and private operational records from one secure workspace.</p></div><Link href="/" className="arrow-link">View public site <Icon name="arrow" size={18} /></Link></div>
      <div className="admin-notice"><strong>Rooted In Christ workspace</strong><p>Manage ministry content and private records from one secure workspace. Nothing is published without authorised review.</p></div>
      <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Workspace modules</p><h2>Manage the ministry</h2></div><p>Open a module to create, review, or maintain approved records.</p></div><div className="admin-module-grid">{modules.map(([title, description, role, href]) => <Link href={href} className="admin-module" key={title}><span className="admin-module-role">{role}</span><h3>{title}</h3><p>{description}</p><span className="module-state">Open module <Icon name="arrow" size={16} /></span></Link>)}</div></section>
    </div></main>;
}
