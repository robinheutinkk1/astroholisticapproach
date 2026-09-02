import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/format";
import { toggleMessageHandled } from "@/app/admin/actions";
import { interests } from "@/content/faq";
import type { ContactMessage } from "@/lib/types";

export const dynamic = "force-dynamic";

function interestLabel(value: string | null): string {
  if (!value) return "—";
  return interests.find((option) => option.value === value)?.label ?? value;
}

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
      <h2 style={{ fontSize: "1.5rem" }}>Messages</h2>

      <div style={{ display: "grid", gap: 16, marginTop: 28 }}>
        {messages.map((message) => (
          <div className={`admin-card${message.handled ? "" : " unread"}`} key={message.id}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
              <div>
                <strong>
                  {message.first_name} {message.last_name}
                </strong>{" "}
                <a href={`mailto:${message.email}`} style={{ color: "var(--c-gold)", fontSize: "0.9rem" }}>
                  {message.email}
                </a>
                <div style={{ fontSize: "0.8rem", color: "var(--c-mute-2)", marginTop: 4 }}>
                  {formatDate(message.created_at)} · {interestLabel(message.interest)}
                </div>
              </div>

              <form action={toggleMessageHandled}>
                <input type="hidden" name="id" value={message.id} />
                <input type="hidden" name="handled" value={String(message.handled)} />
                <button type="submit" className="admin-ghost">
                  {message.handled ? "Mark unread" : "Mark handled"}
                </button>
              </form>
            </div>

            <p
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid var(--c-line-soft)",
                color: "var(--c-mute)",
                fontSize: "0.92rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {message.message}
            </p>
          </div>
        ))}

        {messages.length === 0 && <div className="empty-state">No messages yet.</div>}
      </div>
    </div>
  );
}
