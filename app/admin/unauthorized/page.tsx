import Link from "next/link";
export const metadata = { title: "Access not permitted" };
export default function UnauthorizedPage() { return <main id="main-content" className="simple-page"><section className="container legal-content"><p className="eyebrow">Access control</p><h1>This area is restricted.</h1><p>Your account does not have the role required for this administration area. Contact the Super Admin if you believe this is incorrect.</p><Link className="button" href="/admin">Return to dashboard</Link></section></main>; }
