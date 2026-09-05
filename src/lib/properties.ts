import villaAster from "../assets/villa-aster.jpg";
import meridianLoft from "../assets/meridian-loft.jpg";
import casaSolana from "../assets/casa-solana.jpg";
import hilltopFarmhouse from "../assets/hilltop-farmhouse.jpg";
import larchHouse from "../assets/larch-house.jpg";
import palmCourt from "../assets/palm-court.jpg";
import duneHouse from "../assets/dune-house.jpg";
import foundryLoft from "../assets/foundry-loft.jpg";
import cypressVilla from "../assets/cypress-villa.jpg";

export type PropertyType = "villa" | "loft" | "coastal";

export interface Property {
  slug: string;
  name: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  tag?: string;
  portrait?: boolean;
  image: string;
  description: string;
  features: string[];
}

export const properties: Property[] = [
  {
    slug: "casa-solana",
    name: "Casa Solana",
    location: "Malibu",
    price: "$4.8M",
    beds: 5,
    baths: 4,
    sqft: 4800,
    type: "coastal",
    tag: "Signature",
    portrait: true,
    image: casaSolana,
    description:
      "Perched above the Pacific on a private bluff, Casa Solana is a study in glass and golden light. Floor-to-ceiling glazing wraps the main level, dissolving the line between the living spaces and the horizon. Evenings end on the cantilevered terrace as the sun drops into the sea.",
    features: [
      "Cantilevered ocean terrace",
      "Floor-to-ceiling glass walls",
      "Heated limestone floors",
      "Private beach path",
      "Chef's kitchen with oak cabinetry",
      "Two-car garage and motor court",
    ],
  },
  {
    slug: "villa-aster",
    name: "Villa Aster",
    location: "Sonoma",
    price: "$3.2M",
    beds: 4,
    baths: 3,
    sqft: 3600,
    type: "villa",
    tag: "New",
    portrait: true,
    image: villaAster,
    description:
      "A stone villa in the heart of wine country, Villa Aster pairs old-world materiality with a quietly modern plan. Cypress trees line the approach, and evenings gather around the courtyard fountain as the hills turn amber.",
    features: [
      "Hand-cut stone facade",
      "Courtyard with fountain",
      "Cypress-lined drive",
      "Vineyard views",
      "Wine cellar",
      "Guest annex",
    ],
  },
  {
    slug: "the-meridian-loft",
    name: "The Meridian Loft",
    location: "Tribeca",
    price: "$2.1M",
    beds: 2,
    baths: 2,
    sqft: 1900,
    type: "loft",
    portrait: true,
    image: meridianLoft,
    description:
      "Inside a converted 1912 warehouse, the Meridian Loft holds sixteen-foot ceilings, arched steel windows and walls washed in warm terracotta plaster. Brass fixtures catch the afternoon light that pours across the polished concrete floor.",
    features: [
      "16-ft vaulted ceilings",
      "Arched industrial windows",
      "Terracotta plaster walls",
      "Brass fixtures throughout",
      "Keyed elevator entry",
      "Original timber beams",
    ],
  },
  {
    slug: "hilltop-farmhouse",
    name: "Hilltop Farmhouse",
    location: "Napa",
    price: "$1.6M",
    beds: 3,
    baths: 2,
    sqft: 2900,
    type: "villa",
    image: hilltopFarmhouse,
    description:
      "Set on a gentle rise above the valley, this farmhouse keeps its cream cabinetry, terracotta tile and slow mornings intact. The kitchen opens to a herb garden, and every window frames a row of vines.",
    features: [
      "Terracotta tile floors",
      "Farmhouse kitchen",
      "Wrap-around porch",
      "Herb and kitchen garden",
      "Barn workshop",
      "Valley views",
    ],
  },
  {
    slug: "the-larch-house",
    name: "The Larch House",
    location: "Hudson Valley",
    price: "$2.4M",
    beds: 4,
    baths: 3,
    sqft: 3400,
    type: "villa",
    image: larchHouse,
    description:
      "Named for the larches that ring it, this warm-plastered house is built for readers and slow Sundays. A sunlit nook anchors every floor, and the plaster walls hold the day's light long after dusk.",
    features: [
      "Warm plaster interiors",
      "Reading nook on every floor",
      "Linen-draped windows",
      "Wood-burning stove",
      "Mature larch grove",
      "Detached studio",
    ],
  },
  {
    slug: "palm-court-residence",
    name: "Palm Court Residence",
    location: "Palm Springs",
    price: "$3.9M",
    beds: 5,
    baths: 4,
    sqft: 4100,
    type: "villa",
    image: palmCourt,
    description:
      "A desert-modern courtyard house arranged around a single olive tree and a still, clear pool. Concrete planes, deep shade and long water make the heat feel like a feature, not a condition.",
    features: [
      "Central pool courtyard",
      "Desert-modern plan",
      "Polished concrete terraces",
      "Olive tree courtyard",
      "Outdoor shower",
      "Mountain views",
    ],
  },
  {
    slug: "the-dune-house",
    name: "The Dune House",
    location: "Montauk",
    price: "$2.9M",
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: "coastal",
    tag: "New",
    image: duneHouse,
    description:
      "Weathered cedar and dune grass, ten steps from the sand. The Dune House wears its salt air honestly — silvered shingles, deep window seats, and a porch made for watching weather roll in.",
    features: [
      "Direct beach access",
      "Weathered cedar siding",
      "Window seats throughout",
      "Outdoor shower",
      "Dune-top porch",
      "Fireplace",
    ],
  },
  {
    slug: "the-foundry-loft",
    name: "The Foundry Loft",
    location: "Oakland",
    price: "$1.9M",
    beds: 2,
    baths: 2,
    sqft: 1650,
    type: "loft",
    image: foundryLoft,
    description:
      "Exposed brick, steel-framed windows and a century of patina. The Foundry Loft keeps its industrial bones and layers them with warm linen, oak and soft late-afternoon light.",
    features: [
      "Exposed brick walls",
      "Steel-framed windows",
      "Concrete floors",
      "Open sleeping mezzanine",
      "Freight elevator",
      "Roof deck rights",
    ],
  },
  {
    slug: "cypress-court-villa",
    name: "Cypress Court Villa",
    location: "Santa Barbara",
    price: "$5.6M",
    beds: 6,
    baths: 5,
    sqft: 5600,
    type: "villa",
    tag: "Signature",
    image: cypressVilla,
    description:
      "A Mediterranean estate organised around a grand fountain court, where cypress columns rise against warm stone. Loggias, balconies and shaded arcades make the outdoors live like another wing of the house.",
    features: [
      "Grand fountain courtyard",
      "Stone loggias and arcades",
      "Six en-suite bedrooms",
      "Olive and citrus gardens",
      "Pool and spa terrace",
      "Three-car garage",
    ],
  },
];

export const featured = properties.filter((p) =>
  ["villa-aster", "the-meridian-loft", "casa-solana"].includes(p.slug)
);

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}
