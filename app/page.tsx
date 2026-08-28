import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { programmeCards } from "@/lib/site-content";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <Image src="/images/ministry-community-hero.png" alt="Community members and volunteers sharing a hopeful moment outdoors" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow light">Faith that grows. Love that serves.</p>
          <h1>Rooted in Christ.<br />Reaching lives.</h1>
          <p className="hero-copy">A community of faith putting the love of Christ into action through discipleship, compassion, and service.</p>
          <div className="button-row"><Link className="button button-gold" href="/about">Discover our mission <Icon name="arrow" size={18} /></Link><Link className="button button-ghost" href="/get-involved">Get involved</Link></div>
        </div>
        <div className="hero-scroll">Faith <span /> Compassion <span /> Service</div>
      </section>

      <section className="intro section">
        <div className="container intro-grid">
          <div><p className="eyebrow">Who we are</p><h2>Growing deep roots.<br />Bearing lasting fruit.</h2></div>
          <div><p className="lead">We believe the gospel transforms whole lives—and transformed lives strengthen families and communities.</p><p>Rooted In Christ Ministry brings Christian discipleship and compassionate community action together. Our public work will always be presented with dignity, care, and verified information.</p><Link className="arrow-link" href="/about">Learn about the ministry <Icon name="arrow" size={18} /></Link></div>
        </div>
      </section>

      <section className="programmes section muted-section">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">How we serve</p><h2>Faith expressed through action</h2></div><p>Our programme framework is designed to grow as verified ministry work is added.</p></div>
          <div className="card-grid">
            {programmeCards.map((card) => <article className="programme-card" key={card.title}><span className="card-icon"><Icon name={card.icon as "cross" | "book" | "heart"} size={30} /></span><p className="card-kicker">{card.kicker}</p><h3>{card.title}</h3><p>{card.description}</p><Link href="/programmes" aria-label={`Explore ${card.title}`}>Explore this area <Icon name="arrow" size={17} /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="impact section">
        <div className="container impact-panel">
          <div><p className="eyebrow light">Projects & impact</p><h2>Accountable service.<br />Stories that matter.</h2><p>Project outcomes and impact figures will only appear after they have been verified and published by authorised ministry administrators.</p><Link className="button button-cream" href="/projects">Explore projects <Icon name="arrow" size={18} /></Link></div>
          <div className="impact-principles"><div><strong>01</strong><span><b>Dignity first</b><small>People are never reduced to statistics.</small></span></div><div><strong>02</strong><span><b>Verified reporting</b><small>No invented outcomes or inflated claims.</small></span></div><div><strong>03</strong><span><b>Responsible stewardship</b><small>Clear, accountable programme records.</small></span></div></div>
        </div>
      </section>

      <section className="welcome section">
        <div className="container welcome-grid">
          <div className="welcome-verse"><span>“</span><blockquote>Let your roots grow down into him, and let your lives be built on him.</blockquote><cite>Colossians 2:7</cite></div>
          <div><p className="eyebrow">Take your next step</p><h2>Everyone has something meaningful to contribute.</h2><p>Whether you want to volunteer your skills, build a partnership, support the mission, or request assistance, we are creating clear and respectful ways to connect.</p><div className="action-links"><Link href="/get-involved">Volunteer or partner <Icon name="arrow" size={18} /></Link><Link href="/give">Support the mission <Icon name="arrow" size={18} /></Link><Link href="/assistance">Request assistance <Icon name="arrow" size={18} /></Link></div></div>
        </div>
      </section>

      <section className="cta-band"><div className="container"><div><p className="eyebrow light">Stay connected</p><h2>Hope grows when we grow together.</h2></div><Link className="button button-gold" href="/contact">Contact the ministry <Icon name="arrow" size={18} /></Link></div></section>
    </main>
  );
}
