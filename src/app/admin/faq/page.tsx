import { getSettings } from "@/lib/settings";
import { FaqForm } from "@/components/admin/FaqForm";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="admin-head">
        <h2>FAQ</h2>
        <p>
          The questions under the contact form. Drag them into order with the arrows. Plain text is fine; a link is
          written as <code>&lt;a href=&quot;/terms&quot;&gt;terms and conditions&lt;/a&gt;</code>.
        </p>
      </div>
      <FaqForm faq={settings.faq} />
    </div>
  );
}
