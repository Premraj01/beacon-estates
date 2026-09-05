import { Link } from "@tanstack/react-router";
import type { Property } from "../lib/properties";

interface Props {
  property: Property;
  delayClass?: string;
  card?: boolean;
}

export function PropertyCard({ property, delayClass = "rise", card = false }: Props) {
  const aspect = property.portrait && !card ? "aspect-[4/5]" : "aspect-[4/3]";

  const inner = (
    <>
      <div className={`relative overflow-hidden ${card ? "rounded-[min(1vw,10px)]" : "rounded-[min(1.2vw,12px)]"}`}>
        <img
          src={property.image}
          alt={`${property.name}, ${property.location}`}
          loading="lazy"
          className={`property-img w-full object-cover ${aspect}`}
        />
        {property.tag && (
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] ${
              property.tag === "Signature" ? "bg-terracotta text-cream" : "bg-cream/90 text-ink"
            }`}
          >
            {property.tag}
          </span>
        )}
      </div>
      <div className={card ? "px-2 pt-4 pb-2" : "mt-4"}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={`font-display leading-tight ${card ? "text-lg" : "text-xl"}`}>{property.name}</h3>
          <p className="shrink-0 text-sm font-semibold text-terracotta">{property.price}</p>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          {property.location} · {property.beds} beds · {property.baths} baths
          {card ? ` · ${property.sqft.toLocaleString()} sq ft` : ""}
        </p>
      </div>
    </>
  );

  return (
    <Link
      to="/properties/$slug"
      params={{ slug: property.slug }}
      className={`group block ${delayClass} ${
        card ? "rounded-[min(1.2vw,12px)] bg-paper p-3 ring-1 ring-black/5" : ""
      }`}
    >
      {inner}
    </Link>
  );
}
