import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="simple-page"><section className="container legal-content"><p className="eyebrow">Page not found</p><h1>This page has not taken root yet.</h1><p>The address may have changed or the page may still be in development.</p><Link className="button" href="/">Return to the homepage</Link></section></main>;
}
