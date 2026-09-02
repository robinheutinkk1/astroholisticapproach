"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { submitContactForm, type ContactState } from "@/app/actions/contact";
import { interests } from "@/content/faq";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const searchParams = useSearchParams();
  const [state, formAction] = useActionState(submitContactForm, initialState);

  // Every "Request this reading" button links here with ?i=…, so the visitor
  // lands on the form with the right service already chosen.
  const preselected = searchParams.get("i") ?? "";
  const defaultInterest = interests.some((option) => option.value === preselected) ? preselected : "";

  if (state.status === "success") {
    return (
      <div className="form reveal">
        <div className="form-success is-visible" role="status" aria-live="polite">
          <span className="check" aria-hidden="true">
            ✓
          </span>
          <span className="msg">Thank you, your message has reached me. I will reply within 24 hours.</span>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="form reveal">
      <div className="form-head">
        <h3>Session request</h3>
        <p>Fill in a few details and I&rsquo;ll come back to you personally.</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            required
            minLength={2}
            placeholder="Your first name"
          />
          <FieldError message={state.fieldErrors?.firstName} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required
            minLength={2}
            placeholder="Your last name"
          />
          <FieldError message={state.fieldErrors?.lastName} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="you@example.com"
        />
        <FieldError message={state.fieldErrors?.email} />
      </div>

      <div className="form-group">
        <label htmlFor="interest">I&rsquo;m interested in</label>
        <select id="interest" name="interest" required defaultValue={defaultInterest}>
          <option value="">Choose…</option>
          {interests.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError message={state.fieldErrors?.interest} />
      </div>

      <div className="form-group">
        <label htmlFor="message">Your message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          placeholder="Tell me a bit about what you are working with."
        />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && <p className="form-error is-visible">{state.message}</p>}

      <SubmitButton />

      <p className="form-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 018 0v3" />
        </svg>{" "}
        Your details are only used to reply. No spam, ever.
      </p>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="form-error is-visible">{message}</span>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary form-submit" disabled={pending}>
      <span className="label">{pending ? "Sending…" : "Send message"}</span>
      <span className="arrow">→</span>
    </button>
  );
}
