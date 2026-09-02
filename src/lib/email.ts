import "server-only";

import { Resend } from "resend";
import { env } from "@/lib/env";

/**
 * Sends a notification. Email is a nice-to-have on top of the database row:
 * if Resend is not configured or fails, the caller has already persisted the
 * data, so we log and carry on rather than failing the user's request.
 */
export async function sendNotification(options: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = env.resendApiKey;
  const to = env.contactToEmail;

  if (!apiKey || !to) {
    return { sent: false, reason: "RESEND_API_KEY or CONTACT_TO_EMAIL not configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: env.contactFromEmail,
      to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    if (error) {
      console.error("[email] Resend returned an error", error);
      return { sent: false, reason: error.message };
    }
    return { sent: true };
  } catch (error) {
    console.error("[email] failed to send", error);
    return { sent: false, reason: "unexpected error" };
  }
}
