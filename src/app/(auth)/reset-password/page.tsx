import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/Layout";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <Section style={{ paddingTop: 120 }}>
      <div className="auth-card">
        <h1>New password</h1>
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </Section>
  );
}
