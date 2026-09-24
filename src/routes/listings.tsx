import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { fetchProperties, isArchived, type PropertyType } from "../lib/properties";
import { PropertyCard } from "../components/PropertyCard";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/listings")({
  loader: () => fetchProperties(),
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

type Filter = "all" | PropertyType | "4plus" | "archived";

/**
 * Kinds come from the CRM's vocabulary now. Only the ones actually in the
 * portfolio are offered, so a filter never returns an empty collection.
 */
const KIND_LABELS: Record<PropertyType, string> = {
  Villa: "Villas",
  Apartment: "Apartments",
  House: "Houses",
  Plot: "Plots",
  Land: "Land",
  Commercial: "Commercial",
};

function ListingsPage() {
  const properties = Route.useLoaderData();
  const [filter, setFilter] = useState<Filter>("all");

  const available = properties.filter((p) => !isArchived(p.status));
  const archived = properties.filter((p) => isArchived(p.status));
  const kinds = [...new Set(properties.map((p) => p.type))];
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...kinds.map((kind) => ({ id: kind, label: KIND_LABELS[kind] })),
    { id: "4plus", label: "4+ beds" },
    ...(archived.length ? [{ id: "archived" as Filter, label: "Sold & let" }] : []),
  ];

  const visible = properties.filter((p) => {
    if (filter === "all") return true;
    if (filter === "archived") return isArchived(p.status);
    if (filter === "4plus") return p.beds >= 4 && !isArchived(p.status);
    return p.type === filter && !isArchived(p.status);
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
            {available.length} {available.length === 1 ? "home" : "homes"} currently on the market —
            each photographed at the hour the light is kindest, each walked by our studio before it
            earns a place here.
            {archived.length > 0 && ` ${archived.length} more recently sold or let.`}
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
