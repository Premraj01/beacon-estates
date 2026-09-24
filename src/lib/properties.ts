/**
 * The portfolio, read from the Maison CRM API.
 *
 * Listings used to be hardcoded in this file. They now live in the CRM's
 * Postgres database, which is the single source of truth for both this site
 * and the CRM — publishing or editing a listing there changes this site on the
 * next request, with no rebuild.
 *
 * The API's shape is translated here into the one this site's components
 * already speak (`location`, `beds`, `sqft`, a formatted `price` string), so
 * the pages stayed as they were.
 */

const API_URL = import.meta.env["VITE_API_URL"] ?? "http://localhost:3000";
const API_PREFIX = import.meta.env["VITE_API_PREFIX"] ?? "/api";

/**
 * Matches `PROPERTY_KINDS` in the backend's `properties.types.ts`. The site
 * used to have its own villa/loft/coastal vocabulary; it now shares the CRM's
 * so a listing means the same thing in both places.
 */
export type PropertyType = "Apartment" | "House" | "Villa" | "Plot" | "Land" | "Commercial";

export type PropertyTag = "Signature" | "New";

/**
 * Where a listing stands. Sold and rented listings stay on the site — shown
 * blurred and stamped — because a full sale board is the best advertisement a
 * broker has. `isArchived` is the single test for that everywhere.
 */
export type PropertyStatus = "Available" | "Sold" | "Rented";

export function isArchived(status: PropertyStatus): boolean {
  return status === "Sold" || status === "Rented";
}

export interface Property {
  slug: string;
  name: string;
  location: string;
  /** Pre-formatted for display — "$4.8M", or "Price on request" when unset. */
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  status: PropertyStatus;
  tag?: PropertyTag;
  portrait?: boolean;
  featured: boolean;
  image: string;
  description: string;
  features: string[];
}

/** One listing as the API sends it. */
interface ApiProperty {
  slug: string;
  name: string;
  address: string;
  kind: PropertyType;
  listing: "Rent" | "Sale";
  status: PropertyStatus;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  tag: PropertyTag | null;
  portrait: boolean;
  featured: boolean;
  details: string;
  features: string[];
  images: string[];
}

interface Paginated<T> {
  items: T[];
  total: number;
}

/** Shown when a listing has no photograph yet. */
const PLACEHOLDER_IMAGE = "/listings/placeholder.jpg";

/**
 * Prices are stored as whole currency units and shown the way an agent writes
 * them on a board — "$4.8M", "$950K". A listing without a price is published
 * deliberately, so it says so rather than showing a zero.
 */
export function formatPrice(price: number | null, listing: "Rent" | "Sale" = "Sale"): string {
  if (price === null) return "Price on request";
  if (listing === "Rent") return `$${price.toLocaleString("en-US")}/mo`;
  if (price >= 1_000_000) return `$${trimZeroes(price / 1_000_000)}M`;
  if (price >= 1_000) return `$${trimZeroes(price / 1_000)}K`;
  return `$${price.toLocaleString("en-US")}`;
}

/** 4.80 -> "4.8", 3.00 -> "3" — one decimal, no trailing zero. */
function trimZeroes(value: number): string {
  return value.toFixed(1).replace(/\.0$/, "");
}

function toProperty(api: ApiProperty): Property {
  return {
    slug: api.slug,
    name: api.name,
    location: api.address,
    price: formatPrice(api.price, api.listing),
    // The CRM leaves these unset for land and commercial units, where they
    // carry no meaning; the cards read them as numbers, so they become 0.
    beds: api.bedrooms ?? 0,
    baths: api.bathrooms ?? 0,
    sqft: api.area ?? 0,
    type: api.kind,
    status: api.status,
    ...(api.tag ? { tag: api.tag } : {}),
    ...(api.portrait ? { portrait: true } : {}),
    featured: api.featured,
    image: api.images[0] ?? PLACEHOLDER_IMAGE,
    description: api.details,
    features: api.features,
  };
}

/**
 * These routes are public on the API, so no credentials are sent. A failure
 * here is a failure to render a page, so it is thrown rather than swallowed —
 * the router's error boundary shows it instead of an empty, healthy-looking
 * collection.
 */
async function get<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${API_PREFIX}${path}`);
  } catch {
    throw new Error(`Could not reach the Maison API at ${API_URL}. Is the backend running?`);
  }
  if (!response.ok) {
    throw new Error(`Maison API responded ${response.status} for ${path}`);
  }
  return (await response.json()) as T;
}

/** Every published listing, newest first. */
export async function fetchProperties(): Promise<Property[]> {
  // The portfolio is small; one page covers it and keeps the pages simple.
  const page = await get<Paginated<ApiProperty>>("/properties?limit=200");
  // Archived listings stay in the collection but sink below what is still on
  // offer, so the first thing a visitor sees is something they can buy.
  return page.items
    .map(toProperty)
    .sort((a, b) => Number(isArchived(a.status)) - Number(isArchived(b.status)));
}

/** The three the CRM has flagged for the homepage. */
export async function fetchFeatured(): Promise<Property[]> {
  const page = await get<Paginated<ApiProperty>>("/properties?featured=true&limit=12");
  return page.items.map(toProperty);
}

/** One listing by its slug, or null when it is unpublished or removed. */
export async function fetchProperty(slug: string): Promise<Property | null> {
  try {
    return toProperty(await get<ApiProperty>(`/properties/${encodeURIComponent(slug)}`));
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) return null;
    throw error;
  }
}

/** What the viewing form sends. `propertySlug` is what ties it to a listing. */
export interface EnquiryDraft {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  interest?: string;
  propertySlug?: string;
}

/**
 * Files an enquiry against the CRM. This is the one write the site makes, and
 * it is anonymous by design — the API keeps the endpoint narrow and rate
 * limited rather than asking a prospective buyer to sign in.
 *
 * The lead lands in the CRM at stage "New", attached to the listing named here.
 */
export async function submitEnquiry(draft: EnquiryDraft): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${API_PREFIX}/leads/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
  } catch {
    throw new Error("Could not reach us just now. Please try again in a moment.");
  }

  if (response.status === 429) {
    throw new Error("That's a few enquiries already — please give it a few minutes.");
  }
  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    throw new Error(readMessage(payload) ?? "Something went wrong sending that.");
  }
}

/** Nest sends `message` as a string, or an array for validation errors. */
function readMessage(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) return null;
  const { message } = payload as { message?: unknown };
  if (typeof message === "string") return message;
  if (Array.isArray(message)) return message.filter((p) => typeof p === "string").join(", ");
  return null;
}
