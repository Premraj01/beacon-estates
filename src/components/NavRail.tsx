import { Link } from "@tanstack/react-router";

const items = [
  {
    to: "/",
    label: "Home",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M3 11l9-8 9 8M5 10v9h14v-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/listings",
    label: "Listings",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M4 4h16v16H4zM4 10h16M10 4v16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/about",
    label: "Studio",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 10v6M12 8h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/contact",
    label: "Contact",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M4 6h16v12H4zM4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

export function NavRail() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[92px] flex-col items-center border-r border-line bg-cream/85 py-8 backdrop-blur-sm sm:flex">
      <Link to="/" className="flex flex-col items-center gap-2" aria-label="Maison home">
        <div className="grid size-10 place-items-center rounded-full bg-ink font-display text-lg font-medium text-cream">
          M
        </div>
        <span
          className="rotate-180 text-[9px] uppercase tracking-[0.25em] text-ink-soft"
          style={{ writingMode: "vertical-rl" }}
        >
          Maison
        </span>
      </Link>
      <nav className="mt-10 flex flex-col items-center gap-7">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="group flex flex-col items-center gap-1.5"
            title={item.label}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`transition-transform group-hover:scale-110 ${
                    isActive ? "text-terracotta" : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[9px] uppercase tracking-[0.15em] ${
                    isActive ? "text-terracotta" : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex flex-col items-center gap-3">
        <Link to="/listings" className="text-ink-soft transition-colors hover:text-ink" title="Search listings">
          <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
