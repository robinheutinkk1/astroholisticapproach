"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-night-900/60 px-4 py-3 text-mist-100 placeholder:text-mist-500 focus:border-gold-400 focus:outline-none";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-gold-500/40 bg-night-900/60 px-6 py-10 text-center">
        <p className="font-display text-2xl text-gold-300">Message sent</p>
        <p className="mt-3 text-mist-300">
          {state.message ?? "Thank you — your message has arrived."} You will usually hear back
          within two working days.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-mist-200">
          Your name
        </label>
        <input id="name" name="name" required maxLength={120} className={fieldClass} />
        <FieldError message={state.fieldErrors?.name} />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-mist-200">
          Email
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
        <FieldError message={state.fieldErrors?.email} />
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm text-mist-200">
          Subject <span className="text-mist-500">(optional)</span>
        </label>
        <input id="subject" name="subject" maxLength={200} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-mist-200">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={fieldClass} />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-300">{message}</p>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-gold-400 px-7 py-3 text-sm font-semibold text-night-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}
