"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const supabase = createClient();

    try {
      // Whatever Supabase answers — including "no such user" — the page says
      // the same thing, so it cannot be used to find out which addresses are
      // real. A request that never reached Supabase is different: saying a
      // mail is on its way would leave someone waiting for nothing.
      await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setSent(true);
    } catch {
      setError("We could not reach the server. Please check your connection and try again.");
    }

    setPending(false);
  }

  if (sent) {
    return (
      <p className="auth-done">
        If there is an account for that address, a link is on its way. It is valid for one hour, and
        it has to be opened in this same browser.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      {error && <p className="admin-alert">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={pending} style={{ justifyContent: "center" }}>
        {pending ? "Sending…" : "Send me a link"}
      </button>
    </form>
  );
}
