"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site-content";
import { Icon } from "./icon";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Rooted In Christ Ministry home" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Icon name="sprout" size={27} /></span>
          <span><strong>Rooted In Christ</strong><small>Ministry</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="text-link desktop-give" href="/give">Give</Link>
          <Link className="button button-small" href="/assistance">Request assistance</Link>
          <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className={`mobile-panel ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          {navigation.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link href="/give" onClick={() => setOpen(false)}>Give</Link>
          <Link href="/assistance" onClick={() => setOpen(false)}>Request assistance</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
