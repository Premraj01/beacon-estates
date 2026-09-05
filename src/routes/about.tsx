import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "../components/SiteFooter";
import studio from "../assets/studio.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Studio — Maison" },
      {
        name: "description",
        content:
          "Maison is a small residential brokerage that believes a home is chosen by its light, not its square footage.",
      },
      { property: "og:title", content: "The Studio — Maison" },
      {
        property: "og:description",
        content: "A small residential brokerage for those who collect light, not square footage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Light first",
    body: "We photograph and evaluate every home at the hour its light is most honest. A house that holds light well holds life well.",
  },
  {
    title: "Fewer, better",
    body: "Nine residences, not nine hundred. Each listing is walked, argued over and earned before it joins the collection.",
  },
  {
    title: "Quiet sales",
    body: "Most of our placements never reach the open market. Discretion is not a premium tier here — it is the default.",
  },
];

function AboutPage() {
  return (
    <main>
      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="rise mb-6 text-[11px] uppercase tracking-[0.3em] text-terracotta">
                The studio · Est. 2014
              </p>
              <h1 className="rise-1 font-display text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
                We collect light, not <span className="italic text-terracotta">listings</span>
              </h1>
              <p className="rise-2 mt-6 max-w-[42ch] text-pretty text-ink-soft sm:text-lg">
                Maison began as two brokers and a camera, driving the coast at golden hour to learn
                which houses glowed and which merely glittered. Twelve years on, the method is
                unchanged: walk every home, argue about it over prints, and only then offer it to
                the people who trust us.
              </p>
              <div className="rise-3 mt-9">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-3 text-sm font-medium text-cream ring-1 ring-ink transition-transform hover:-translate-y-0.5"
                >
                  Meet the studio
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="fade-slow overflow-hidden rounded-[min(1.5vw,16px)]">
                <img
                  src={studio}
                  alt="Maison brokers reviewing printed photographs of homes at an oak table"
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12 sm:py-16">
          <h2 className="rise font-display text-3xl tracking-tight sm:text-4xl">
            How we choose
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className={`rise-${i + 1} border-t border-line pt-6`}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-snug">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
