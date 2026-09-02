-- Content carried over from the original single-file site.
--
-- The nine products are the ones that were already listed on the site. The six
-- articles are the titles that were queued for the blog; they are inserted as
-- DRAFTS with their excerpts, because no article body was ever written. Open
-- each one in /admin, write it, tick Published.
--
-- Safe to run repeatedly.

insert into public.products
  (slug, name, summary, description, price_cents, price_on_request, currency, icon, category, badge, kind, sort_order)
values
  ('written-chart-report', 'Written Chart Report by e-mail',
   'A personalised written report covering your full chart and key life themes, delivered after your reading.',
   E'A personalised written report covering your full chart and key life themes, delivered after your reading.',
   20000, false, 'eur', 'chart', 'reports', 'Bestseller', 'digital', 1),

  ('lunar-ritual-kit', 'Lunar Ritual Kit',
   'Selenite, palo santo and a 12-month moon-phase journal for monthly ritual practice.',
   E'Selenite, palo santo and a 12-month moon-phase journal for monthly ritual practice.',
   7200, false, 'eur', 'star', 'reports', 'New', 'physical', 2),

  ('12-month-forecast-ebook', '12-Month Forecast eBook',
   'A guide to the planetary movements of the year, sign by sign, with weekly notes.',
   E'A guide to the planetary movements of the year, sign by sign, with weekly notes.',
   2900, false, 'eur', 'book', 'reports', 'Digital', 'digital', 3),

  ('ayurveda-starter-guide', 'Ayurveda Starter Guide',
   'An introduction to Ayurveda: dosha test, food principles and a starter routine.',
   E'An introduction to Ayurveda: dosha test, food principles and a starter routine.',
   1900, false, 'eur', 'leaf', 'reports', 'Digital', 'digital', 4),

  ('grounding-bracelet', 'Grounding Bracelet',
   'Black tourmaline, hematite, smoky quartz. For periods of overwhelm or during major transitions.',
   E'Black tourmaline, hematite, smoky quartz. For periods of overwhelm or during major transitions.',
   8900, false, 'eur', 'circle', 'jewelry', 'Bestseller', 'physical', 5),

  ('heart-centre-pendant', 'Heart Centre Pendant',
   'Rose quartz core in a 925 silver setting. Worn for opening through grief or relational shifts.',
   E'Rose quartz core in a 925 silver setting. Worn for opening through grief or relational shifts.',
   12900, false, 'eur', 'heart', 'jewelry', 'New', 'physical', 6),

  ('personalised-bracelet', 'Personalised Bracelet',
   'A bracelet made in combination with your natal chart, so the bracelet or pendant is a unique, one-off jewel made especially for you.',
   E'A bracelet made in combination with your natal chart, so the bracelet or pendant is a unique, one-off jewel made especially for you.\n\nSend a message describing what you are working with and Milan selects the stones from your chart.',
   0, true, 'eur', 'beads', 'jewelry', 'Custom', 'physical', 7),

  ('citrine-cluster', 'Citrine Cluster',
   'Hand-selected cluster for clarity and decision-making. Ethically sourced.',
   E'Hand-selected cluster for clarity and decision-making. Ethically sourced.',
   5500, false, 'eur', 'gem', 'crystals', 'Single', 'physical', 8),

  ('clear-quartz-set', 'Clear Quartz Set',
   'A trio of clear quartz pieces. The all-purpose stones every practice needs.',
   E'A trio of clear quartz pieces. The all-purpose stones every practice needs.',
   4200, false, 'eur', 'triple', 'crystals', 'Set of 3', 'physical', 9)
on conflict (slug) do nothing;

insert into public.posts (slug, title, excerpt, content, category, read_minutes, published)
values
  ('moon-phases-as-a-planning-tool',
   'How to read the moon phases as a real planning tool, not a vibe',
   'A practical guide to using the lunar cycle for what you actually do each month.',
   '', 'Astrology', 8, false),

  ('saturn-return-survival-guide',
   'Saturn Return: a survival guide for your late twenties',
   'The most important transit of your life, in plain language, and the mistakes most people make.',
   '', 'Psychology', 12, false),

  ('why-your-morning-routine-keeps-failing',
   'Why your morning routine keeps failing',
   'Most Ayurvedic morning routines are built for monks. Here is the version for working adults.',
   '', 'Ayurveda', 7, false),

  ('rising-sign-explained',
   'Your rising sign explained: the mask and the medicine',
   'Why the ascendant matters more than your sun sign, and how to work with it.',
   '', 'Astrology', 10, false),

  ('choose-your-first-crystal',
   'How to choose your first crystal without getting scammed',
   'A short guide to sourcing real stones and avoiding the dyed glass.',
   '', 'Cards', 6, false),

  ('shadow-work-without-the-aesthetic',
   'Shadow work without the Instagram aesthetic',
   'What Jungian shadow work actually looks like in practice, with five concrete prompts.',
   '', 'Psychology', 9, false)
on conflict (slug) do nothing;
