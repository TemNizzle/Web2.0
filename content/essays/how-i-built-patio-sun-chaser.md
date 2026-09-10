---
title: "How I built Patio Sun Chaser"
date: "2026-08-25"
excerpt: "A live map of Toronto patios colored by how much sun they're actually getting right now — and the shortcuts, validation work, and real weather data it took to make that number trustworthy."
tag: "Build"
project: "sun-chaser"
---

Toronto patio season is short, and "does this place get sun right now" is a question everyone asks and nobody has a good answer to. Sun Chaser is a live map that tries to answer it directly: every patio marker is colored on a sun-intensity gradient — red for direct sun, amber for sun that's up but blocked, green for no sun to be had.

The hard part isn't the map. It's the number behind the color.

**Sun position is the easy 80%.** [`suncalc`](https://github.com/mourner/suncalc) gives real astronomical sun position for any time and location, so "is the sun even in the sky, and where" is solved for free. The 20% that actually matters is orientation and obstruction — which direction a patio faces and what's blocking it — and there's no open dataset for that at the individual-patio level.

**So the first version guessed, and I labeled the guess.** Every patio ships with an `exposureSource` and `verifiedAt` field, and anything not confirmed shows an "Estimated" trust indicator on the detail page instead of pretending to certainty it doesn't have. From there I worked through patios in person and by phone, replacing estimates with verified orientation and obstruction tiers one neighborhood at a time — starting with the highest-traffic strip (King/Queen West) first.

**Weather turned out to matter more than I expected.** A patio can be geometrically in the sun and still be useless under solid cloud cover, so "sunny now" pulls live cloud cover from [Open-Meteo](https://open-meteo.com/) (free, no key) and discounts the estimate accordingly. Previewing a different time on the slider falls back to the pure sun-position model, since forecast-accurate cloud cover for an arbitrary future hour isn't worth the complexity yet.

**The status model got simpler as real data came in.** It started as a wider set of exposure states and collapsed down to three — sunny, partial, shaded — plus the intensity gradient for color, once it was clear more categories were just adding noise nobody could act on.

Stack is Next.js on Vercel, Mapbox GL for the 3D map, and a static per-patio detail page for each spot so it's SEO-legible on its own. Next up is replacing the manually-curated orientation data with a real shadow model built from City of Toronto building-footprint and height data — the placeholder was always meant to be temporary, not the plan.
