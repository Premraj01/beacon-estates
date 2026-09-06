# Maison CRM — Boilerplate UI

A separate CRM app that reuses the Maison look: warm cream/ink/terracotta palette, Fraunces headings + Manrope body, plus a matching dark mode. Sample data only for now — no logins or saved records yet.

## Important: this needs a new project

The Maison website stays exactly as it is. The CRM is a brand-new app, so create a new project in Lovable (New Project), then send this same brief there and I'll build it. Everything below describes what gets built in that new project.

## Foundation

- Warm design tokens (paper, cream, ink, ink-soft, line, terracotta) defined once, with a full dark variant and a theme toggle that remembers the choice.
- Fraunces for headings, Manrope for body/UI, tabular numbers for metrics.
- Shell: fixed left navigation rail (Dashboard, Leads, Customers, Team, Settings) with collapse, top bar with search, notifications, theme toggle, and a role switcher for previewing permissions.

## Reusable component kit

Buttons (primary/secondary/ghost/danger, sizes, loading state), cards & stat cards, modal/dialog, drawer, snackbar/toasts, banners (info/success/warning/error), tables with sorting, pagination and empty states, form inputs (text, select, date, textarea, search), badges & status pills, tabs, dropdown menus, avatars, tooltips, full-page app loader, skeleton loaders (card, table row, list, chart), empty and error states. A "Components" page shows every element in one place for reference.

## Screens

1. **Dashboard** — KPI stat cards (leads, conversions, pipeline value, revenue), pipeline chart, lead-source breakdown, recent activity feed, tasks list.
2. **Leads** — table + kanban pipeline view (New, Contacted, Qualified, Proposal, Won/Lost) with drag between stages, filters, search, lead detail drawer with timeline and notes, add/edit lead modal.
3. **Customers** — customer list with segments and health status, customer detail page (profile, contacts, deals, activity, files tab).
4. **Team & permissions** — user list with roles (Admin, Manager, Sales rep, Viewer), invite-user modal, permission matrix screen showing what each role can do; the role switcher visibly changes what is available.
5. **Settings** — profile, appearance (theme), notifications, pipeline stage configuration.
6. **Sign-in screen** — visual only for now, matching the theme.

## Motion

Consistent, restrained: page fade/rise on entry, staggered card reveals, smooth drawer/modal transitions, animated counters on the dashboard, shimmer skeletons, hover lifts. All respect reduced-motion preferences.

## Technical notes

- React 19 + TypeScript on the current Lovable stack (TanStack Start, Vite), Tailwind v4 tokens in `src/styles.css`, shadcn/ui primitives restyled to the Maison theme, lucide icons, Recharts for charts, sonner for snackbars.
- Sample data in typed local modules (`src/data/*.ts`) with a mock permission helper (`can(role, action)`), so swapping in a real backend later touches only the data layer.
- Each route gets its own page metadata; components live in `src/components/ui` (primitives) and `src/components/crm` (domain pieces).
