# Maison — Warm Editorial Real Estate Website

A refined real estate listing site in the chosen "Warm editorial light" style: warm paper tones, Fraunces serif headlines + Manrope body, terracotta accents, and a fixed vertical navigation rail on the left.

## Design tokens (from chosen direction)
- Colors: paper #F3ECE1, cream #FBF7F0, ink #221E19, ink-soft #6A6155, line #E2D8C8, terracotta #C15B33, terracotta-soft #E8B79E
- Fonts: Fraunces (display serif), Manrope (sans) via Google Fonts link in root head
- Motion: staggered rise-in animations, slow hero parallax drift, hover image zoom, gentle fades

## Shared layout (every page)
- Fixed left vertical nav rail (92px): logo mark "M" + vertical "Maison" wordmark, icon+label nav items (Home, Listings, Studio/About, Contact), search icon at bottom; active item in terracotta
- Content offset by the rail; max-width 1240px containers
- Dark ink footer with wordmark and tagline

## Pages
1. **Home (/)** — per the chosen direction: hero with headline "The quiet art of living well" + featured image card, stats band (residences placed, sales, cities, clients), "This week's residences" featured row (3 portrait cards), "Explore the collection" grid with filter chips, footer
2. **Listings (/listings)** — full property grid (9 listings) with working filter chips (All / Villas / Lofts / Coastal / 4+ beds), price/beds/baths/sqft on each card
3. **Property detail (/properties/$slug)** — large gallery image, specs, description, features list, agent card, "Book a viewing" CTA; reachable from every listing card
4. **About (/about)** — studio story, values, team-style editorial section
5. **Contact (/contact)** — enquiry form (name, email, message) with success toast, office details

## Data & images
- A local typed data file (~9 properties: name, slug, location, price, beds, baths, sqft, type, tag, description, features)
- AI-generated imagery for hero, each listing card, and detail gallery (warm, sunlit, editorial style per direction)
- No backend/database in this phase — content is curated static data

## Technical notes
- TanStack Start routes: index.tsx, listings.tsx, properties.$slug.tsx, about.tsx, contact.tsx; nav rail in a shared component used in __root.tsx
- Tokens added to src/styles.css (@theme with the palette above, oklch equivalents); fonts loaded via link in __root head
- Each route gets its own head() metadata (unique title/description, og tags)
- Animations: CSS keyframes (rise, fade, parallax) defined in styles.css, matching the prototype
