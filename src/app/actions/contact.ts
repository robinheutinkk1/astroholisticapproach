"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Please write at least a sentence.").max(5000),
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

export async function submitContactForm(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || undefined,
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

  const { name, email, subject, message } = parsed.data;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, subject: subject ?? null, message });

  if (error) {
    console.error("[contact] insert failed", error.message);
    return {
      status: "error",
      message: "Something went wrong saving your message. Please try again.",
    };
  }

  // The message is already stored; a failed email must not fail the request.
  await sendNotification({
    subject: `New enquiry from ${name}`,
    replyTo: email,
    html: `
      <h2>New enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject ?? "—")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  return { status: "success", message: "Thank you — your message has arrived." };
}
