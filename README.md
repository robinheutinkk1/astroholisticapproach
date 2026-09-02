# Holistic Astro Approach

De website van **holisticastroapproach.com** (Milan Landkroon, Amsterdam),
omgezet van HighLevel naar een eigen stack: **Next.js op Vercel** met
**Supabase** als database en **Stripe** voor betalingen.

De hele bestaande site is meeverhuisd — dezelfde teksten, dezelfde
vormgeving (nachtblauw/goud, Cormorant Garamond + Manrope), dezelfde
paginastructuur. Drie dingen zijn nieuw of anders:

| Onderdeel | Op HighLevel | Nu |
| --- | --- | --- |
| **Blog** | "Under construction" | Werkend, met eigen CMS op `/admin` |
| **Shop** | "Under construction" | Werkend, met winkelmandje en Stripe-checkout |
| **Contactformulier** | Webhook naar HighLevel (`leadconnectorhq.com`) | Opslag in je eigen Supabase-database + notificatiemail |

Verder: echte URL's in plaats van hash-routes (`/astrology/vedic` in plaats
van `#/astrology/vedic`), waardoor elke pagina apart vindbaar is in Google,
met een sitemap en per pagina eigen title en omschrijving.

---

## 1. Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul de waarden in (stap 2 en 4)
npm run dev                  # http://localhost:3000
```

Verder: `npm run build`, `npm run typecheck`.

---

## 2. Supabase opzetten

1. Maak een project aan op [supabase.com](https://supabase.com).
2. Draai `supabase/migrations/0001_init.sql` in de **SQL Editor**, of via de CLI:

   ```bash
   npx supabase link --project-ref <project-ref>
   npx supabase db push
   ```

3. Draai `supabase/seed.sql`. Die zet de negen producten van de site klaar en
   de zes blogtitels als **concept** (zie "Nog te doen").
4. Kopieer uit **Project settings › API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` — **alleen server-side**, nooit in de browser.

### Jezelf admin maken

Maak een gebruiker aan via **Authentication › Users › Add user** (e-mail +
wachtwoord, "Auto Confirm User" aanvinken) en zet daarna de rol:

```sql
update public.profiles set role = 'admin' where email = 'landkroonmilan@gmail.com';
```

Inloggen op `/login`, daarna is `/admin` bereikbaar: blogartikelen,
producten, bestellingen en binnengekomen berichten.

### Beveiliging

Row Level Security staat op elke tabel aan:

| Tabel | Anoniem | Admin |
| --- | --- | --- |
| `posts` | alleen `published = true` | volledig |
| `products` | alleen `active = true` | volledig |
| `orders`, `order_items` | geen toegang | lezen (status wijzigen) |
| `contact_messages` | geen toegang | lezen, afvinken |

Bestellingen en contactberichten worden weggeschreven met de service-role key
vanuit server-code, nooit vanuit de browser.

---

## 3. Stripe

1. Pak je **secret key** uit Stripe → `STRIPE_SECRET_KEY`.
2. Voeg een webhook toe op `https://<domein>/api/webhooks/stripe` met de events
   `checkout.session.completed` en `checkout.session.expired`. De signing
   secret gaat naar `STRIPE_WEBHOOK_SECRET`.
3. Lokaal testen: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

Twee dingen die bewust zo zijn gebouwd:

- **Prijzen worden altijd opnieuw uit de database gelezen** bij het afrekenen.
  De browser stuurt alleen product-id en aantal mee, dus een gemanipuleerd
  winkelmandje kan de prijs niet veranderen.
- **Een bestelling wordt precies één keer geboekt.** De webhook zet alleen een
  `pending` bestelling op `paid`, dus een herhaalde levering van hetzelfde
  event boekt niets dubbel en haalt de voorraad niet twee keer af.

Bij fysieke producten (sieraden, stenen) vraagt Stripe een verzendadres voor
een lijst Europese landen. Daarbuiten geldt wat in de voorwaarden staat:
verzendkosten worden apart per e-mail doorgegeven.

**iDEAL:** zet dit aan in je Stripe-dashboard onder *Settings › Payment
methods*; de checkout pikt het daarna vanzelf op. Wil je liever Mollie, dan
vervang je `src/lib/stripe.ts`, `src/app/api/checkout/route.ts` en de
webhook-route — de rest blijft gelijk.

---

## 4. E-mail (optioneel)

`RESEND_API_KEY` en `CONTACT_TO_EMAIL` zorgen voor een notificatie bij een
nieuw contactbericht of een nieuwe bestelling. Zonder die variabelen werkt de
site gewoon: alles staat in de database en is zichtbaar onder `/admin`.

---

## 5. Deployen naar Vercel

1. Importeer de repository op [vercel.com](https://vercel.com). Next.js wordt
   automatisch herkend.
2. Zet onder **Settings › Environment Variables** alles uit `.env.example`
   (Production én Preview).
3. Zet `NEXT_PUBLIC_SITE_URL` op `https://holisticastroapproach.com`.
4. Deploy en controleer de preview-URL.

### Domein overzetten vanaf HighLevel

Pas doen als de preview-URL helemaal goed staat.

1. Voeg in Vercel het domein toe onder **Settings › Domains**
   (`holisticastroapproach.com` én `www`).
2. Verlaag bij je DNS-provider eerst de **TTL** naar 300 seconden en wacht de
   oude TTL uit. Daardoor is de omschakeling straks binnen minuten klaar.
3. Zet de records om naar de waarden die Vercel toont (A-record voor het
   apex-domein, CNAME voor `www`).
4. Laat de HighLevel-site nog een paar dagen staan als terugvaloptie.
5. Controleer daarna: SSL actief, `/sitemap.xml` en `/robots.txt` bereikbaar,
   Stripe-webhook op het nieuwe domein, en een testbericht via het
   contactformulier dat in `/admin/messages` binnenkomt.

**Over de oude links:** de HighLevel-site was één pagina met hash-routes
(`#/astrology`). Zoekmachines zagen daar één URL, dus er gaan geen
geïndexeerde pagina's verloren. Wie een oude link opent, komt op de homepage
terecht. Wil je die links tóch automatisch doorsturen naar het nieuwe pad, dan
kan dat met een klein stukje JavaScript — laat het weten.

---

## Structuur

```
src/
  app/
    (auth)/login/          inloggen voor de admin
    admin/                 CMS: artikelen, producten, bestellingen, berichten
    api/checkout/          maakt de Stripe Checkout-sessie aan
    api/webhooks/stripe/   verwerkt betaalde bestellingen
    astrology/ cards/ …    de overgezette informatiepagina's
    blog/  shop/  cart/    het nieuwe blog- en shopgedeelte
    actions/contact.ts     verwerking van het contactformulier
  components/              navigatie, footer, paginasjablonen, winkelmandje
  content/                 teksten, tarieven, FAQ, sessies
  lib/                     Supabase-clients, queries, helpers
supabase/
  migrations/0001_init.sql schema en RLS-policies
  seed.sql                 de negen producten + zes blogtitels als concept
public/                    de zodiakcirkel en de portretfoto
```

Tarieven staan op één plek: `src/content/pricing.ts`. Je past een bedrag daar
aan en het verandert op elke pagina waar het voorkomt, net als in de oude
`settings`-blok van de HighLevel-pagina.

---

## Nog te doen

- [ ] **De zes blogartikelen schrijven.** De titels en samenvattingen stonden al
      klaar op de oude site, maar er was nog geen tekst. Ze staan nu als
      concept in `/admin/posts`; publiceren zodra ze geschreven zijn. Zolang
      er niets gepubliceerd is, meldt de blogpagina dat netjes.
- [ ] **Productfoto's uploaden.** De negen producten gebruiken nu de getekende
      symbolen van de oude site. Upload foto's naar Supabase Storage (publieke
      bucket) en plak de URL in het veld *Image URL*.
- [ ] **Verzendkosten bepalen** voor de fysieke producten, of ze in de prijs
      verwerken.
- [ ] Stripe van test- naar live-keys omzetten.
- [ ] Domein overzetten volgens het stappenplan hierboven.
