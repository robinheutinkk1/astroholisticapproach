"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendNotification } from "@/lib/email";
import { interests } from "@/content/faq";

const allowedInterests = interests.map((option) => option.value);

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name.").max(80),
  lastName: z.string().trim().min(2, "Please enter your last name.").max(80),
  email: z.email("Please enter a valid email.").max(200),
  interest: z.string().refine((value) => allowedInterests.includes(value), "Please choose an option."),
  message: z.string().trim().min(10, "Please share a few words about what you are seeking.").max(5000),
  // Honeypot: real people leave this hidden field empty.
  website: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Replaces the HighLevel form webhook the old site posted to. The enquiry is
 * stored in Postgres first, so it survives an email outage, and only then is a
 * notification attempted.
 */
export async function submitContactForm(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    interest: formData.get("interest") ?? "",
    message: formData.get("message"),
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    // A filled honeypot is a bot: answer as if it worked, store nothing.
    if (fieldErrors.website) return { status: "success" };
    return { status: "error", message: "Please check the form.", fieldErrors };
  }

  const { firstName, lastName, email, interest, message } = parsed.data;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("contact_messages").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    interest,
    message,
  });

  if (error) {
    console.error("[contact] insert failed", error.message);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or email Milan directly.",
    };
  }

  const interestLabel = interests.find((option) => option.value === interest)?.label ?? interest;

  // The enquiry is already stored; a failed email must not fail the request.
  await sendNotification({
    subject: `New enquiry from ${firstName} ${lastName} — ${interestLabel}`,
    replyTo: email,
    html: `
      <h2>New session request</h2>
      <p><strong>Name:</strong> ${escapeHtml(`${firstName} ${lastName}`)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Interested in:</strong> ${escapeHtml(interestLabel)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  return { status: "success" };
}
