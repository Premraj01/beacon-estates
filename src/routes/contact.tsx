import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison" },
      {
        name: "description",
        content:
          "Book a private viewing or enquire about the Maison collection. Offices in Malibu and Tribeca.",
      },
      { property: "og:title", content: "Contact — Maison" },
      {
        property: "og:description",
        content: "Book a private viewing or enquire about the Maison collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="rise mb-6 text-[11px] uppercase tracking-[0.3em] text-terracotta">
                Enquiries
              </p>
              <h1 className="rise-1 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
                Begin a <span className="italic text-terracotta">conversation</span>
              </h1>
              <p className="rise-2 mt-6 max-w-[40ch] text-pretty text-ink-soft">
                Tell us what you're looking for — a first home, a quiet sale, or simply a viewing at
                golden hour. A broker replies within one working day.
              </p>
              <div className="rise-3 mt-10 space-y-6 border-t border-line pt-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Malibu</p>
                  <p className="mt-1 text-sm text-ink">22800 Pacific Coast Hwy, Suite 4</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Tribeca</p>
                  <p className="mt-1 text-sm text-ink">12 Harrison Street, Floor 2</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Write</p>
                  <p className="mt-1 text-sm text-ink">studio@maison.example</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {sent ? (
                <div className="fade-slow flex h-full min-h-[320px] flex-col items-center justify-center rounded-[min(1.5vw,16px)] bg-paper p-10 text-center ring-1 ring-line">
                  <span className="grid size-12 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                    <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h2 className="mt-5 font-display text-2xl">Thank you — received.</h2>
                  <p className="mt-2 max-w-[36ch] text-sm text-ink-soft">
                    A broker will reply within one working day. Until then, the collection is open
                    for browsing.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rise-2 rounded-[min(1.5vw,16px)] bg-paper p-6 ring-1 ring-line sm:p-10"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Name</span>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-terracotta focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Email</span>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-terracotta focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="mt-6 block">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                      I'm interested in
                    </span>
                    <select
                      name="interest"
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-terracotta focus:outline-none"
                    >
                      <option>Booking a viewing</option>
                      <option>Buying a residence</option>
                      <option>A quiet sale</option>
                      <option>Something else</option>
                    </select>
                  </label>
                  <label className="mt-6 block">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Message</span>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell us about the light you're looking for…"
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-terracotta focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-3 text-sm font-medium text-cream ring-1 ring-ink transition-transform hover:-translate-y-0.5"
                  >
                    Send enquiry
                    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
