import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/format";
import { toggleMessageHandled } from "@/app/admin/actions";
import type { ContactMessage } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const messages = (data ?? []) as ContactMessage[];

  return (
    <div>
      <h1 className="font-display text-2xl text-mist-100">Messages</h1>

      <ul className="mt-8 space-y-4">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`rounded-2xl border p-5 ${
              message.handled
                ? "border-white/10 bg-night-900/30 opacity-70"
                : "border-gold-500/30 bg-night-900/50"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium text-mist-100">
                  {message.name}{" "}
                  <a
                    href={`mailto:${message.email}`}
                    className="text-sm text-gold-300 hover:underline"
                  >
                    {message.email}
                  </a>
                </p>
                <p className="mt-1 text-sm text-mist-500">
                  {formatDate(message.created_at)}
                  {message.subject ? ` · ${message.subject}` : ""}
                </p>
              </div>

              <form action={toggleMessageHandled}>
                <input type="hidden" name="id" value={message.id} />
                <input type="hidden" name="handled" value={String(message.handled)} />
                <button
                  type="submit"
                  className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-mist-300 hover:border-gold-400 hover:text-gold-300"
                >
                  {message.handled ? "Mark unread" : "Mark handled"}
                </button>
              </form>
            </div>

            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed whitespace-pre-wrap text-mist-200">
              {message.message}
            </p>
          </li>
        ))}

        {messages.length === 0 && (
          <li className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-mist-500">
            No messages yet.
          </li>
        )}
      </ul>
    </div>
  );
}
