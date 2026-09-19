import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { programmeCategories, publicPages } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };
const legalPages: Record<string, { title: string; description: string }> = {
  privacy: { title: "Privacy policy", description: "We handle contact details and ministry enquiries with care, use them only for their stated purpose, and keep private requests restricted to authorised ministry users." },
  safeguarding: { title: "Safeguarding policy", description: "Rooted In Christ Ministry is committed to treating every person with dignity, responding responsibly to concerns, and protecting people who engage with ministry activities." },
  terms: { title: "Terms and conditions", description: "Use this website respectfully and provide accurate information when contacting or supporting Rooted In Christ Ministry." },
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
  if (legal) return <main id="main-content" className="simple-page"><section className="container legal-content"><p className="eyebrow">Trust & governance</p><h1>{legal.title}</h1><div className="notice-card"><strong>Ministry commitments</strong><p>{legal.description}</p></div><p>These commitments guide how the ministry handles public information, contact requests, and participation. Contact the ministry if you need clarification.</p><Link className="arrow-link" href="/">Return home <Icon name="arrow" size={18} /></Link></section></main>;
  return <main id="main-content" className="simple-page"><section className="page-hero"><div className="container"><p className="eyebrow light">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.description}</p></div></section><section className="container page-body"><div><p className="eyebrow">Our work</p><h2>Faith expressed through practical service.</h2><p>Rooted In Christ Ministry shares public information with care, respect, and accountability.</p>{slug === "programmes" && <div className="category-list"><p className="eyebrow">Programme areas</p><div className="category-chips">{programmeCategories.map((category) => <span key={category}>{category}</span>)}</div><p className="category-note">Our programme areas support discipleship, learning, empowerment, humanitarian care, and community connection.</p></div>}</div><aside className="notice-card"><strong>Content safeguard</strong><p>Names, contact details, registration information, statistics, financial information, and project outcomes will not be invented.</p></aside></section></main>;
}
