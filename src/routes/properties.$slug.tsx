import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProperty, properties } from "../lib/properties";
import { PropertyCard } from "../components/PropertyCard";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    return property;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name}, ${loaderData.location} — Maison` : "Not found — Maison" },
      ...(loaderData
        ? [
            {
              name: "description",
              content: `${loaderData.name} in ${loaderData.location}: ${loaderData.beds} beds, ${loaderData.baths} baths, ${loaderData.sqft.toLocaleString()} sq ft. Listed at ${loaderData.price}.`,
            },
            { property: "og:title", content: `${loaderData.name}, ${loaderData.location} — Maison` },
            {
              property: "og:description",
              content: loaderData.description.slice(0, 150),
            },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
          ]
        : [{ name: "robots", content: "noindex" }]),
    ],
  }),
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const property = Route.useLoaderData();
  const others = properties.filter((p) => p.slug !== property.slug).slice(0, 3);

  return (
    <main>
      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-10 sm:px-12 sm:py-14">
          <Link
            to="/listings"
            className="rise inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <svg className="size-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to the collection
          </Link>

          <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="fade-slow relative overflow-hidden rounded-[min(1.5vw,16px)]">
                <img
                  src={property.image}
                  alt={`${property.name}, ${property.location}`}
                  className="aspect-[4/3] w-full object-cover"
                />
                {property.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-terracotta px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cream">
                    {property.tag}
                  </span>
                )}
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="rise text-[11px] uppercase tracking-[0.3em] text-terracotta">
                {property.location}
              </p>
              <h1 className="rise-1 mt-3 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
                {property.name}
              </h1>
              <p className="rise-2 mt-4 font-display text-3xl text-terracotta">{property.price}</p>
              <div className="rise-2 mt-6 grid grid-cols-3 gap-4 border-y border-line py-5">
                <div>
                  <p className="font-display text-2xl">{property.beds}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">Beds</p>
                </div>
                <div>
                  <p className="font-display text-2xl">{property.baths}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">Baths</p>
                </div>
                <div>
                  <p className="font-display text-2xl">{property.sqft.toLocaleString()}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">Sq ft</p>
                </div>
              </div>
              <p className="rise-3 mt-6 text-pretty leading-relaxed text-ink-soft">
                {property.description}
              </p>
              <div className="rise-4 mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-3 text-sm font-medium text-cream ring-1 ring-ink transition-transform hover:-translate-y-0.5"
                >
                  Book a viewing
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <span className="text-sm text-ink-soft">Private showings, seven days a week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12 sm:py-16">
          <h2 className="rise font-display text-3xl tracking-tight">What the house holds</h2>
          <div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {property.features.map((f, i) => (
              <div key={f} className={`rise-${(i % 3) + 1} flex items-start gap-3 border-b border-line pb-4`}>
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-terracotta" />
                <p className="text-sm text-ink">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More residences */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12 sm:py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="rise font-display text-3xl tracking-tight">Also in the collection</h2>
            <Link
              to="/listings"
              className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:inline-flex"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <PropertyCard key={p.slug} property={p} delayClass={`rise-${i + 1}`} card />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
