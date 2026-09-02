-- Sample content so the site renders before the real copy is imported.
-- Safe to run repeatedly; safe to delete once real content is in.

insert into public.products (slug, name, summary, description, price_cents, currency, kind, sort_order)
values
  ('natal-chart-reading', 'Natal Chart Reading',
   'A 90-minute deep dive into your birth chart, recorded so you can revisit it.',
   E'Your natal chart is the sky at the moment you arrived. In this 90-minute session we read it as a whole: the elemental balance, the houses that carry the most weight, and the aspects that shape how you meet the world.\n\n**What you receive**\n\n- A 90-minute live session over video\n- A recording of the full reading\n- A written summary with the key placements\n\nBooking details are sent by email after checkout.',
   16500, 'eur', 'service', 1),
  ('solar-return-reading', 'Solar Return Reading',
   'A year-ahead reading cast for your birthday, mapping the themes of your next cycle.',
   E'Once a year the Sun returns to the exact degree it held at your birth. The chart for that moment describes the year that follows.\n\nWe look at where the emphasis falls, which areas of life are lit up, and how that interacts with the transits already running through your natal chart.',
   12500, 'eur', 'service', 2),
  ('relationship-synastry', 'Relationship Synastry',
   'Two charts side by side: what flows easily between you and what asks for work.',
   E'Synastry compares two charts to show the texture of a relationship — romantic, creative, or family.\n\nThe session is for one or both people. We cover the contacts that create ease, the ones that create friction, and the composite chart that describes the relationship as its own entity.',
   19500, 'eur', 'service', 3),
  ('holistic-astrology-workbook', 'The Holistic Astrology Workbook',
   'A 60-page PDF for reading your own chart, with exercises and reference tables.',
   E'A downloadable workbook that takes you from the twelve signs through houses, aspects and transits, with exercises at the end of each chapter.\n\nDelivered as a PDF immediately after purchase.',
   3200, 'eur', 'digital', 4)
on conflict (slug) do nothing;

insert into public.posts (slug, title, excerpt, content, tags, published, published_at)
values
  ('what-holistic-astrology-means', 'What a Holistic Approach to Astrology Actually Means',
   'Your chart is not a verdict. It is a description of the material you were given — and holistic practice starts with what you do with it.',
   E'Most people meet astrology as prediction: what will happen, and when. A holistic approach starts somewhere else — with the question of what you are working with.\n\n## The chart as material, not verdict\n\nA natal chart describes tendencies, not outcomes. Saturn on your Midheaven does not decide your career; it describes the shape of the effort your career will ask from you. That distinction is the whole practice.\n\n## Body, pattern, and timing\n\nHolistic work reads three layers together:\n\n1. **The natal chart** — the material you were given.\n2. **The lived pattern** — how you have actually been using it.\n3. **The current transits** — what the sky is asking of you right now.\n\nNone of the three is enough alone. Read together, they tend to describe something you already half knew.\n\n## Where to start\n\nIf you are new to your own chart, start with the elemental balance and the houses that hold the most planets. That is usually enough to recognise yourself.',
   array['foundations', 'practice'], true, now() - interval '21 days'),
  ('reading-your-saturn-return', 'Reading Your Saturn Return Without Dread',
   'Around ages 29, 58 and 87, Saturn comes back to where it started. It has a reputation. Here is what it is actually doing.',
   E'Saturn takes roughly 29.5 years to travel the zodiac, so somewhere around your thirtieth birthday it returns to the degree it occupied when you were born. The internet has decided this is a catastrophe. It is not.\n\n## What a return is\n\nA return is a cycle closing and reopening. Saturn''s cycle is about structure: the commitments you have made, the ones you have avoided, and whether the life you built can hold the weight you are putting on it.\n\n## Why it feels heavy\n\nSaturn removes what was never load-bearing. Jobs, relationships and habits that were held together by momentum rather than choice tend to come apart. That is uncomfortable, and it is also the point.\n\n## Working with it\n\n- Look at the house Saturn occupies natally. That is the area under review.\n- Notice what you are already avoiding. Saturn returns rarely surprise anyone.\n- Choose deliberately rather than waiting to be forced.\n\nPeople who come out of a Saturn return well are usually the ones who made the decision before it was made for them.',
   array['transits', 'saturn'], true, now() - interval '9 days'),
  ('moon-phases-and-rhythm', 'Working With the Moon''s Phases as a Rhythm, Not a Rule',
   'Lunar cycles are useful the way seasons are useful: as a rhythm to plan against, not a set of instructions.',
   E'The moon moves through its full cycle every 29.5 days. Used well, that cycle is a planning rhythm.\n\n## A simple structure\n\n- **New moon** — begin, decide, plant.\n- **First quarter** — the first real obstacle appears. Adjust.\n- **Full moon** — everything is visible, including what is not working.\n- **Last quarter** — release, edit, finish.\n\n## Keep it light\n\nIf a lunar practice starts producing anxiety about doing things on the "wrong" day, it has stopped being useful. The cycle is a rhythm you can lean on, not a rule that governs you.',
   array['moon', 'practice'], true, now() - interval '3 days')
on conflict (slug) do nothing;
