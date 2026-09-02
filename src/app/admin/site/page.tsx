import { getSettings } from "@/lib/settings";
import { SiteForm } from "@/components/admin/SiteForm";

export const dynamic = "force-dynamic";

export default async function AdminSitePage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="admin-head">
        <h2>Details &amp; socials</h2>
        <p>
          Your contact address, social media links, business details and the image people see when they share the site.
          Everything here appears on the public pages straight away.
        </p>
      </div>
      <SiteForm settings={settings} />
    </div>
  );
}
