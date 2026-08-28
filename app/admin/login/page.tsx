import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
export const metadata = { title: "Admin sign in", description: "Secure administration sign in for Rooted In Christ Ministry." };
export default function AdminLoginPage() { return <main id="main-content" className="admin-login-page"><div className="admin-login-card"><p className="eyebrow">Private administration</p><h1>Welcome back.</h1><p>Sign in with your assigned ministry administrator account.</p><AdminLoginForm /><p className="admin-login-note">Your Super Admin account controls roles and client administrator access. Never share your password.</p><Link href="/" className="arrow-link">Return to public site</Link></div></main>; }
