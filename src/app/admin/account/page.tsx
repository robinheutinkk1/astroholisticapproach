import { getAdminUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export default async function AccountPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  return (
    <>
      <h2>Your account</h2>
      <p style={{ color: "var(--c-mute-2)", fontSize: "0.86rem", margin: "8px 0 26px" }}>
        You are signed in as <strong style={{ color: "var(--c-light)" }}>{admin.email}</strong>. To
        change the address itself, ask whoever set the site up — that one is changed in Supabase.
      </p>

      <div className="admin-card" style={{ maxWidth: 520 }}>
        <h3 style={{ fontSize: "1.15rem", marginBottom: 18 }}>Change your password</h3>
        <ChangePasswordForm email={admin.email} />
      </div>
    </>
  );
}
