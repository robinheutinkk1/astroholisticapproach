import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/Layout";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <Section style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Sign in</h1>
        <p style={{ textAlign: "center", color: "var(--c-mute-2)", fontSize: "0.88rem", marginTop: 12 }}>
          Admin access for managing the blog, the shop and enquiries.
        </p>
        <div style={{ marginTop: 28 }}>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
