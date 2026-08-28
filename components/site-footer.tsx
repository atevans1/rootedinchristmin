import Link from "next/link";
import { navigation } from "@/lib/site-content";
import { Icon } from "./icon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Link href="/" className="brand brand-footer"><span className="brand-mark"><Icon name="sprout" size={27} /></span><span><strong>Rooted In Christ</strong><small>Ministry</small></span></Link>
          <p>A Christian ministry committed to spiritual growth, compassionate service, and flourishing communities.</p>
          <span className="content-note">Official contact and registration information will be added after verification.</span>
        </div>
        <div><h2>Explore</h2>{navigation.slice(0, 4).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
        <div><h2>Connect</h2><Link href="/get-involved">Volunteer</Link><Link href="/give">Give</Link><Link href="/assistance">Request assistance</Link><Link href="/contact">Contact</Link></div>
        <div><h2>Trust</h2><Link href="/privacy">Privacy policy</Link><Link href="/safeguarding">Safeguarding</Link><Link href="/terms">Terms & conditions</Link></div>
      </div>
      <div className="container footer-bottom"><p>© {new Date().getFullYear()} Rooted In Christ Ministry. All rights reserved.</p><p>Faith · Compassion · Service</p></div>
    </footer>
  );
}
