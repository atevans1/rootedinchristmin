import Link from "next/link";
import { AdminPasswordResetForm } from "@/components/admin-password-reset-form";
export const metadata = { title: "Set new password", description: "Set a new Rooted In Christ administrator password." };
export default function ResetPasswordPage() { return <main id="main-content" className="admin-login-page"><div className="admin-login-card"><p className="eyebrow">Private administration</p><h1>Set a new password.</h1><p>Choose a strong password for your ministry administrator account.</p><AdminPasswordResetForm /><Link href="/admin/login" className="arrow-link">Back to sign in</Link></div></main>; }
