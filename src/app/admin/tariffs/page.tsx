import { getSettings } from "@/lib/settings";
import { TariffsForm } from "@/components/admin/TariffsForm";

export const dynamic = "force-dynamic";

export default async function AdminTariffsPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="admin-head">
        <h2>Tariffs</h2>
        <p>
          Every amount shown on the site. Write them the way they should read, including the currency sign — for
          example <strong>€225</strong> or <strong>€2,000</strong>. An amount used on several pages changes on all of
          them at once.
        </p>
      </div>
      <TariffsForm tariffs={settings.tariffs} />
    </div>
  );
}
