"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordFields, checkPassword } from "@/components/PasswordFields";

export function ChangePasswordForm({ email }: { email: string }) {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const current = String(data.get("current") ?? "");
    const password = String(data.get("password") ?? "");

    const complaint = checkPassword(password, String(data.get("confirm") ?? ""));
    if (complaint) return setError(complaint);

    setPending(true);
    setError(null);
    setDone(false);

    const supabase = createClient();

    // Ask for the current password first. A session left open on a borrowed
    // laptop should not be enough to lock the owner out of their own site.
    const { error: wrongPassword } = await supabase.auth.signInWithPassword({
      email,
      password: current,
    });
    if (wrongPassword) {
      setError("That is not your current password.");
      setPending(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setPending(false);
      return;
    }

    form.reset();
    setDone(true);
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div>
        <label htmlFor="current">Your current password</label>
        <input id="current" name="current" type="password" required autoComplete="current-password" />
      </div>

      <PasswordFields autoComplete="new-password" />

      {error && <p className="admin-alert">{error}</p>}
      {done && <p className="admin-done">Saved. Use the new password next time you sign in.</p>}

      <button type="submit" className="btn btn-primary" disabled={pending} style={{ justifyContent: "center" }}>
        {pending ? "Saving…" : "Change my password"}
      </button>
    </form>
  );
}
