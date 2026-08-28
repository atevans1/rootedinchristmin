import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { programmeCategories, publicPages } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };
const legalPages: Record<string, { title: string; description: string }> = {
  privacy: { title: "Privacy policy", description: "A ministry-approved privacy policy will be published here before personal information is collected." },
  safeguarding: { title: "Safeguarding policy", description: "The ministry's approved safeguarding commitments and reporting process will be published here." },
  terms: { title: "Terms and conditions", description: "Approved website terms will be published here before operational services are launched." },
};

export function generateStaticParams() { return [...Object.keys(publicPages), ...Object.keys(legalPages)].map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = publicPages[slug] ?? legalPages[slug];
  return page ? { title: page.title, description: page.description } : {};
}

export default async function PublicPage({ params }: Props) {
  const { slug } = await params;
  const page = publicPages[slug];
  const legal = legalPages[slug];
  if (!page && !legal) notFound();
  if (legal) return <main id="main-content" className="simple-page"><section className="container legal-content"><p className="eyebrow">Trust & governance</p><h1>{legal.title}</h1><div className="notice-card"><strong>Document pending approval</strong><p>{legal.description}</p></div><p>No legal claims or policy commitments have been fabricated. This controlled placeholder prevents an unfinished policy from being mistaken for an approved ministry document.</p><Link className="arrow-link" href="/">Return home <Icon name="arrow" size={18} /></Link></section></main>;
  return <main id="main-content" className="simple-page"><section className="page-hero"><div className="container"><p className="eyebrow light">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.description}</p></div></section><section className="container page-body"><div><p className="eyebrow">Foundation in progress</p><h2>This section is ready for verified ministry content.</h2><p>Phase 1 establishes the responsive public route and content structure. Operational forms, database-backed publishing, administrator permissions, and private records will be introduced in the appropriate later phases and tested before launch.</p>{slug === "programmes" && <div className="category-list"><p className="eyebrow">Programme areas</p><div className="category-chips">{programmeCategories.map((category) => <span key={category}>{category}</span>)}</div><p className="category-note">Programme details and descriptions will be published after they are verified by authorised ministry administrators.</p></div>}</div><aside className="notice-card"><strong>Content safeguard</strong><p>Names, contact details, registration information, statistics, financial information, and project outcomes will not be invented.</p></aside></section></main>;
}
