import { signOutAdmin } from "@/app/admin/logout/actions";
export default function LogoutPage() { return <form action={signOutAdmin}><button type="submit">Sign out</button></form>; }
