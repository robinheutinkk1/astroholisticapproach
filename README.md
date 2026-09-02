# Holistic Astro Approach

De website van Holistic Astro Approach, verhuisd van HighLevel naar een eigen
stack: **Next.js op Vercel** met **Supabase** (Postgres, Auth, Storage) als
database en **Stripe** voor betalingen.

Wat er in zit:

- **Blog / journal** — artikelen in markdown, beheerd via een eigen CMS.
- **Shop** — producten en sessies, winkelmandje, afrekenen via Stripe Checkout.
- **Contactformulier** — opslag in Supabase plus notificatiemail via Resend.
- **Admin** — `/admin`, afgeschermd met Supabase Auth: posts, producten,
  bestellingen en berichten.

---

## 1. Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul de waarden in (zie stap 2 en 4)
npm run dev                  # http://localhost:3000
```

Handige scripts: `npm run build`, `npm run typecheck`.

---

## 2. Supabase opzetten

1. Maak een project aan op [supabase.com](https://supabase.com).
2. Draai de migratie: open **SQL Editor** en plak
   `supabase/migrations/0001_init.sql` erin, of gebruik de CLI:

   ```bash
   npx supabase link --project-ref <project-ref>
   npx supabase db push
   ```

3. Optioneel: draai `supabase/seed.sql` voor voorbeeldcontent, zodat de site
   meteen gevuld is. Verwijder die rijen zodra de echte teksten erin staan.
4. Kopieer uit **Project settings › API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` — **alleen server-side**, nooit in de browser.

### Jezelf admin maken

Maak eerst een gebruiker aan via **Authentication › Users › Add user**
(e-mail + wachtwoord, "Auto Confirm User" aanvinken). Er wordt automatisch een
rij in `profiles` aangemaakt. Zet daarna de rol:

```sql
update public.profiles set role = 'admin' where email = 'jij@voorbeeld.nl';
```

Inloggen gaat via `/login`; daarna is `/admin` bereikbaar.

### Beveiliging

Row Level Security staat op elke tabel aan:

| Tabel              | Anoniem                    | Admin        |
| ------------------ | -------------------------- | ------------ |
| `posts`            | alleen `published = true`  | volledig     |
| `products`         | alleen `active = true`     | volledig     |
| `orders`           | geen toegang               | lezen/wijzigen |
| `order_items`      | geen toegang               | lezen        |
| `contact_messages` | geen toegang               | lezen/wijzigen |

Bestellingen en contactberichten worden weggeschreven met de service-role key
vanuit server-code, nooit vanuit de browser.

---

## 3. Afbeeldingen

Gebruik **Storage** in Supabase: maak een publieke bucket (bijvoorbeeld
`media`), upload de afbeelding en plak de publieke URL in het CMS-veld. De
hostname van je Supabase-project staat al in `next.config.ts` toegestaan.

---

## 4. Stripe

1. Maak in Stripe een account en pak de **secret key** (`STRIPE_SECRET_KEY`).
2. Voeg een webhook toe op
   `https://<jouw-domein>/api/webhooks/stripe` met het event
   `checkout.session.completed` (en optioneel `checkout.session.expired`).
   Kopieer de signing secret naar `STRIPE_WEBHOOK_SECRET`.
3. Lokaal testen:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

Prijzen worden **altijd opnieuw uit de database gelezen** bij het afrekenen;
de browser stuurt alleen product-id en aantal mee. Een gemanipuleerd
winkelmandje kan de prijs dus niet veranderen.

Wil je liever iDEAL via Mollie? Dat vervangt `src/lib/stripe.ts`,
`src/app/api/checkout/route.ts` en de webhook-route; de rest blijft gelijk.

---

## 5. E-mail (optioneel)

Zet `RESEND_API_KEY` en `CONTACT_TO_EMAIL` om notificaties te krijgen bij nieuwe
contactberichten en bestellingen. Zonder deze variabelen werkt de site gewoon —
alles staat dan alleen in de database, zichtbaar onder `/admin`.

---

## 6. Deployen naar Vercel

1. Importeer de repository op [vercel.com](https://vercel.com). Next.js wordt
   automatisch herkend; er is geen extra build-configuratie nodig.
2. Zet onder **Settings › Environment Variables** alle variabelen uit
   `.env.example` (voor Production én Preview).
3. Zet `NEXT_PUBLIC_SITE_URL` op het definitieve domein — dit wordt gebruikt
   voor canonical links, de sitemap en de Stripe-redirects.
4. Deploy.

### Overzetten van het domein vanaf HighLevel

Doe dit pas als de Vercel-deploy op de preview-URL helemaal goed staat.

1. Voeg in Vercel het domein toe onder **Settings › Domains**
   (`holisticastroapproach.com` én `www`).
2. Verlaag bij je DNS-provider eerst de **TTL** naar 300 seconden en wacht de
   oude TTL uit. Daardoor is de omschakeling straks binnen minuten klaar.
3. Zet de records om naar de waarden die Vercel toont (een A-record voor het
   apex-domein, een CNAME voor `www`).
4. Laat de HighLevel-site nog een paar dagen staan als terugvaloptie.
5. Controleer daarna: SSL-certificaat actief, `/sitemap.xml` en `/robots.txt`
   bereikbaar, en de Stripe-webhook op het nieuwe domein.

### Oude URL's behouden

Staan de HighLevel-pagina's op andere paden dan hier? Voeg dan redirects toe in
`next.config.ts`, zodat bestaande links en zoekresultaten blijven werken:

```ts
async redirects() {
  return [{ source: "/oude-pad", destination: "/blog/nieuw-pad", permanent: true }];
}
```

---

## Structuur

```
src/
  app/
    (auth)/login/        inlogpagina voor de admin
    admin/               afgeschermd CMS + server actions
    api/checkout/        maakt de Stripe Checkout-sessie aan
    api/webhooks/stripe/ verwerkt betaalde bestellingen
    blog/                overzicht en artikelpagina's
    shop/                overzicht en productpagina's
    actions/contact.ts   verwerking van het contactformulier
  components/            UI, winkelmandje, formulieren
  lib/                   Supabase-clients, queries, env, helpers
supabase/
  migrations/0001_init.sql   schema en RLS-policies
  seed.sql                   voorbeeldcontent
```

---

## Nog te doen bij livegang

- [ ] Teksten en afbeeldingen van de HighLevel-site overzetten via `/admin`.
- [ ] Prijzen en levertijden in de shop controleren.
- [ ] `/privacy` en `/terms` aanvullen met de bedrijfsgegevens.
- [ ] Stripe van test- naar live-keys omzetten.
- [ ] Domein overzetten volgens het stappenplan hierboven.
