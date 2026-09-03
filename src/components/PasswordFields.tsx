"use client";

/**
 * The new-password pair, shared by the reset page and the account page so both
 * ask for the same thing and complain in the same words.
 */

/** Supabase's own minimum is 6; eight is short enough to be honest about. */
export const MIN_PASSWORD = 8;

export function checkPassword(password: string, confirm: string): string | null {
  if (password.length < MIN_PASSWORD) return `Please use at least ${MIN_PASSWORD} characters.`;
  if (password !== confirm) return "The two passwords are not the same.";
  return null;
}

export function PasswordFields({ autoComplete }: { autoComplete: "new-password" }) {
  return (
    <>
      <div>
        <label htmlFor="password">New password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={MIN_PASSWORD}
          autoComplete={autoComplete}
        />
        <p className="field-hint">At least {MIN_PASSWORD} characters. A short sentence works well.</p>
      </div>

      <div>
        <label htmlFor="confirm">Type it once more</label>
        <input id="confirm" name="confirm" type="password" required autoComplete={autoComplete} />
      </div>
    </>
  );
}
