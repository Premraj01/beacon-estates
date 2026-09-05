import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-3xl leading-none text-cream">Maison</p>
            <p className="mt-3 max-w-[36ch] text-sm text-cream/60">
              Residential brokerage for those who collect light, not square footage.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <nav className="flex gap-5">
              <Link to="/listings" className="transition-colors hover:text-cream">
                Listings
              </Link>
              <Link to="/about" className="transition-colors hover:text-cream">
                Studio
              </Link>
              <Link to="/contact" className="transition-colors hover:text-cream">
                Contact
              </Link>
            </nav>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40">
              © 2026 Maison · Est. 2014
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
