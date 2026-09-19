import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
import { PasswordResetForm } from "@/components/password-reset-form";
import { MagicLinkForm } from "@/components/magic-link-form";
export const metadata = { title: "Admin sign in", description: "Secure administration sign in for Rooted In Christ Ministry." };
export default function AdminLoginPage() { return <main id="main-content" className="admin-login-page"><div className="admin-login-card"><p className="eyebrow">Private administration</p><h1>Welcome back.</h1><p>Sign in with your assigned ministry administrator account.</p><AdminLoginForm /><details><summary>Use a magic link instead</summary><p>We will email a secure sign-in link. No password is required.</p><MagicLinkForm /></details><details><summary>Forgot your password?</summary><p>Request a secure password reset email.</p><PasswordResetForm /></details><Link href="/" className="arrow-link">Return to public site</Link></div></main>; }
