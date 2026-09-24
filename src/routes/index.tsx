import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchFeatured, fetchProperties } from "../lib/properties";
import { PropertyCard } from "../components/PropertyCard";
import { SiteFooter } from "../components/SiteFooter";
import heroLiving from "../assets/hero-living.jpg";

export const Route = createFileRoute("/")({
  // Both lists come from the CRM database, so the homepage reflects whatever
  // is published there without a rebuild.
  loader: async () => {
    const [featured, all] = await Promise.all([fetchFeatured(), fetchProperties()]);
    return { featured, all };
  },
  head: () => ({
    meta: [
      { title: "Maison — Curated Homes & Private Residences" },
      {
        name: "description",
        content:
          "A curated collection of considered homes — villas, lofts and coastal residences selected for their light, materiality and calm.",
      },
      { property: "og:title", content: "Maison — Curated Homes & Private Residences" },
      {
        property: "og:description",
        content: "Considered homes selected for their light, materiality and the way they hold a life within them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "240+", label: "Residences placed" },
  { value: "$1.9B", label: "In quiet sales" },
  { value: "18", label: "Cities served" },
  { value: "96%", label: "Returning clients" },
];

function HomePage() {
  const { featured, all } = Route.useLoaderData();
  // Whatever is not in the featured trio, so the grid fills itself as the
  // portfolio changes rather than naming three slugs.
  const explore = all.filter((p) => !featured.some((f) => f.slug === p.slug)).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-10 sm:px-12 sm:py-16">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="rise mb-6 text-[11px] uppercase tracking-[0.3em] text-terracotta">
                Private residences · 2026
              </p>
              <h1
                className="rise-1 font-display text-5xl leading-none tracking-tight text-balance sm:text-6xl xl:text-7xl"
                style={{ maxWidth: "30ch" }}
              >
                The quiet art of
                <br />
                <span className="italic text-terracotta">living well</span>
              </h1>
              <p className="rise-2 mt-6 max-w-[40ch] text-pretty text-base text-ink-soft sm:text-lg">
                A curated collection of considered homes, selected for their light, materiality and
                the way they hold a life within them.
              </p>
              <div className="rise-3 mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/listings"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-3 text-sm font-medium text-cream ring-1 ring-ink transition-transform hover:-translate-y-0.5"
                >
                  View the collection
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-terracotta"
                >
                  Book a viewing
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="fade-slow relative overflow-hidden rounded-[min(1.5vw,16px)]">
                <div className="hero-drift">
                  <img
                    src={heroLiving}
                    alt="Sunlit minimalist living room with warm oak floors and linen sofa"
                    width={1600}
                    height={1000}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 rounded-[min(1vw,10px)] bg-cream/90 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-terracotta">
                    Featured · Malibu
                  </p>
                  <p className="font-display text-lg leading-tight">Casa Solana, $4.8M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-8 sm:px-12 sm:py-10">
          <div className="grid grid-cols-2 gap-6 border-y border-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="fade-slow py-2">
                <p className="font-display text-4xl leading-none">{s.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-8 sm:px-12 sm:py-12">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="rise font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
              This week's residences
            </h2>
            <Link
              to="/listings"
              className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:inline-flex"
            >
              View all listings
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <PropertyCard key={p.slug} property={p} delayClass={`rise-${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore grid */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12 sm:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="rise font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
              Explore the collection
            </h2>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-terracotta"
            >
              Browse all nine residences
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {explore.map((p, i) => (
              <PropertyCard key={p.slug} property={p} delayClass={`rise-${i + 1}`} card />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
