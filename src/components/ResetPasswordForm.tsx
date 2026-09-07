"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PasswordFields, checkPassword } from "@/components/PasswordFields";

type Stage = "checking" | "ready" | "expired" | "done";

export function ResetPasswordForm() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("checking");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // The link carries a one-time code that the Supabase client swaps for a
  // session as the page loads. Until that has happened there is nothing to
  // decide, so the form waits rather than flashing an error.
  useEffect(() => {
    const supabase = createClient();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setStage("ready");
    });

    supabase.auth.getSession().then(({ data }) => {
      setStage((current) => (current === "ready" ? current : data.session ? "ready" : "expired"));
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");

    const complaint = checkPassword(password, String(form.get("confirm") ?? ""));
    if (complaint) return setError(complaint);

    setPending(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setPending(false);
      return;
    }

    setStage("done");
    router.refresh();
  }

  if (stage === "checking") return <p className="auth-lead">One moment…</p>;

  if (stage === "expired") {
    return (
      <>
        <p className="auth-lead">
          This link no longer works. It expires after an hour, and it only works in the same browser
          that asked for it.
        </p>
        <p className="auth-alt">
          <Link href="/forgot-password">Ask for a new link</Link>
        </p>
      </>
    );
  }

  if (stage === "done") {
    return (
      <>
        <p className="auth-done">Your password has been changed.</p>
        <p className="auth-alt">
          <Link href="/admin">Go to the admin</Link>
        </p>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <PasswordFields autoComplete="new-password" />
      {error && <p className="admin-alert">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ justifyContent: "center" }}>
        {pending ? "Saving…" : "Save this password"}
      </button>
    </form>
  );
}
