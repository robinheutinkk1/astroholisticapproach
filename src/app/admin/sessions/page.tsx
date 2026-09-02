import { getSettings } from "@/lib/settings";
import { SessionsForm } from "@/components/admin/SessionsForm";

export const dynamic = "force-dynamic";

export default async function AdminSessionsPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="admin-head">
        <h2>Sessions</h2>
        <p>
          The three blocks on the sessions page. Untick one to take it off the page without losing what you wrote — it
          comes back exactly as it was.
        </p>
      </div>
      <SessionsForm sessions={settings.sessions} />
    </div>
  );
}
