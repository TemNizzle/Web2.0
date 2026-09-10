---
name: "Sun Chaser"
summary: "A live map of Toronto patios, coloured by how much sun each one is actually getting right now."
status: "live"
url: "https://sun.vitalistechnology.com"
stack: ["Next.js", "Vercel", "Mapbox GL", "suncalc", "Open-Meteo"]
year: 2026
order: 1
---

Toronto patio season is short, and "does this place get sun right now" is a
question everyone asks and nobody has a good answer to. Sun Chaser answers it
directly: every patio on the map is coloured on a sun-intensity gradient, from
direct sun through blocked-but-up to fully shaded.

**The problem was never the map — it was the number behind the colour.**
Astronomical sun position is the easy part (`suncalc` gives it for free). What
matters is orientation and obstruction, and there is no open dataset for that at
the individual-patio level.

**So the first version guessed, and labelled the guess.** Anything not verified
in person shows an "Estimated" indicator rather than pretending to a certainty it
doesn't have. Verified orientation and obstruction data then replaced the
estimates one neighbourhood at a time, highest-traffic strips first. Live cloud
cover from Open-Meteo discounts the estimate when the sky doesn't cooperate.

**Next:** replacing the hand-curated orientation data with a real shadow model
built from City of Toronto building-footprint and height data.

Written up in more detail in [How I built Patio Sun Chaser](/essays/how-i-built-patio-sun-chaser).
