import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/ui";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <Section className="py-28">
      <div className="mx-auto max-w-sm">
        <h1 className="text-center font-display text-3xl text-mist-100">Sign in</h1>
        <p className="mt-3 text-center text-sm text-mist-500">
          Admin access for managing the journal, the shop and enquiries.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
