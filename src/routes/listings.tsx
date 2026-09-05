import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { properties, type PropertyType } from "../lib/properties";
import { PropertyCard } from "../components/PropertyCard";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Listings — Maison" },
      {
        name: "description",
        content:
          "Browse the full Maison collection: villas, lofts and coastal residences across 18 cities.",
      },
      { property: "og:title", content: "Listings — Maison" },
      {
        property: "og:description",
        content: "Villas, lofts and coastal residences selected for light and materiality.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ListingsPage,
});

type Filter = "all" | PropertyType | "4plus";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "villa", label: "Villas" },
  { id: "loft", label: "Lofts" },
  { id: "coastal", label: "Coastal" },
  { id: "4plus", label: "4+ beds" },
];

function ListingsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = properties.filter((p) => {
    if (filter === "all") return true;
    if (filter === "4plus") return p.beds >= 4;
    return p.type === filter;
  });

  return (
    <main>
      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12 sm:py-16">
          <p className="rise mb-4 text-[11px] uppercase tracking-[0.3em] text-terracotta">
            The collection
          </p>
          <h1 className="rise-1 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Every residence, considered
          </h1>
          <p className="rise-2 mt-4 max-w-[48ch] text-pretty text-ink-soft">
            Nine homes currently in the portfolio — each photographed at the hour the light is
            kindest, each walked by our studio before it earns a place here.
          </p>

          <div className="rise-3 mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f.id
                    ? "bg-ink text-cream ring-1 ring-ink"
                    : "text-ink-soft ring-1 ring-line hover:text-ink hover:ring-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            {visible.length} {visible.length === 1 ? "residence" : "residences"}
          </p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <PropertyCard key={p.slug} property={p} delayClass={`rise-${(i % 3) + 1}`} card />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
