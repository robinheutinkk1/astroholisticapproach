import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Layout";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgotten password",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <Section style={{ paddingTop: 120 }}>
      <div className="auth-card">
        <h1>Forgotten password</h1>
        <p className="auth-lead">
          Fill in the address you sign in with and we will send you a link to choose a new password.
        </p>
        <ForgotPasswordForm />
        <p className="auth-alt">
          <Link href="/login">Back to signing in</Link>
        </p>
      </div>
    </Section>
  );
}
