# chat.md — Kasratshala project memory

Created 2026-11-01. Append new context below; never delete prior entries — mark superseded items with `[SUPERSEDED]`.

## Project basics
- Lovable project: TanStack Start v1 (React 19, TanStack Router, Vite 7, Tailwind v4, Framer Motion, Jotai).
- Live URL: https://thekasratshala.lovable.app · Preview: id-preview--3dd5050e-8c96-4522-abe6-7707a175e4a8.lovable.app
- Theme: dark premium editorial — night #090a09, forest #182017, bone #2a2c2a, clay #a67c52, gold #c9a050, cream #e9e3d5. Fonts: Cormorant Garamond, Inter, Caveat (handwritten). No AI-image aesthetics.
- Never write command phrases into site copy.
- Home hero: Bunny-hosted YouTube video (H46Oo99i8998) behind nav, oversized iframe hides all YouTube UI; 30s text fade timeline (VIDEO_DURATION_MS).

## Pages & navigation
- Menu: The Way, Schedule, Immersions, Contact + "Join a Program" button + "Store" link (Store = coming-soon modal).
- Routes: /, /schedule, /immersions, /connect, /camps, /courses, /certifications, /programs, /kinetic, /one-flow, /yogarambha (kept out of sitemap/search).
- [SUPERSEDED] Older menus (Certifications, Programs, Camps, Kinetic in menu) — now reachable by URL only.

## Schedule & payments (as of 2026-11-01)
- /schedule rebuilt day-wise (Mon–Sat) from src/data/scheduleData.ts: three dropdowns (Time Preference, Frequency Pass, Program), pass-limit warning blocks checkout, class rows with Select Class toggles.
- Checkout: select classes → floating bar → Complete Registration drawer (name/phone/email) → Pay Securely via src/lib/cashfree.functions.ts (Cashfree). Falls back to UPI QR (src/assets/upi-qr.jpg, UPI ID karamdeshwal@okhdfcbank) + WhatsApp screenshot flow. Phone 83079 29691.
- OPEN: Cashfree keys not provided (CASHFREE_CLIENT_ID / CASHFREE_CLIENT_SECRET). ₹1,500/class is a placeholder. Tuesday classes are "Demo Class – Will Be Updated".

## Database (Neon via Lovable connector)
- All DB access through src/lib/neon.server.ts (connector gateway). Never connect directly; never put connection strings in code. Proof endpoint GET /api/public/health. DDL/migrations run once via connector in chat. DB "neondb" currently has 0 app tables. Auth/object-storage/realtime not wired.

## Mobile fixes (2026-11-01, this session)
- Swept all routes at 390×844: 0px horizontal overflow everywhere; no app JS errors.
- ScheduleDock (October floating pill): on mobile it can be minimized to a small round calendar handle (X next to pill) and restored; dock hidden on /schedule (page has its own schedule + checkout; the pill blocked "Proceed to Checkout"); z-lowered below cart/checkout drawers; safe-area bottom inset; Layout gained pb-24 md:pb-10 so the footer is fully reachable.

## Stale errors (NOT real — do not chase)
- src/lib/utils.ts(8,7) — file is 6 lines; src/pages/Index.tsx, src/pages/NotFound.tsx, src/App.tsx — files don't exist (TanStack project uses src/routes/). Repeatedly reported; build is clean.

## Deployment notes
- No Netlify: publish via Lovable; custom domain connects to the Lovable publish. Domain not yet named by user; site not yet published with latest work.
- Yogarambha is a separate /yogarambha route (mock auth, GSAP + R3F), not in search.
- 2026-11-02: user shared external advice about Netlify/external image URLs. Reviewed: app images already use permanent Lovable CDN assets (/__l5e/assets-v1/...), not expiring temp URLs — no src rewrite needed. Fixed the only real external hotlinks (unused VideoTransition.tsx: Unsplash poster → dojo-building-clear asset, coverr.co video → drone-footage.mp4 asset). styles.css badge-hiding block extended to cover Netlify badge selectors. [Chat.md now includes the project state; original one-line summary superseded.]

## Remaining / open
- Footer nav links still read Practice / Camps / One Flow / Connect (older naming) — flagged, awaiting user decision.
- ScheduleDock's October table still shows the October times (older schedule), while /schedule shows the new weekly roster — user asked to be told if they want it aligned.
- 2026-11-02 (second pass): uploaded context5371.txt re-requested local-asset migration + badge removal. Verified already satisfied: all displayed images/videos use permanent Lovable CDN asset pointers; badge-hiding CSS block already in styles.css. Remaining external URLs are legitimate (canonical/OG links, social links, hero Bunny video player, Cashfree API, Google Maps embed). Only unused WorkshopsSection.tsx still has Unsplash hotlinks — left untouched (not imported anywhere). Stale error reports this turn: src/pages/Index.tsx, src/main.tsx, src/App.tsx — none exist. Build log clean.
- 2026-11-02 (logo swap, user confirmed "yes"): KS_Vector_logo.svg is now the site logo. Processed: stripped its black background layer (it was a solid #000 square with artwork in brown #683a1e / green #498e27 / tan #c38352), cropped viewBox from 1250×1250 (huge margins) to 96 371 1057 509, saved as src/assets/ks-logo-vector.svg. Swapped into Navigation, LoadingScreen, HeroOverlay, Footer (footer's old `invert` filter removed — it would wreck the colored artwork). Favicon: public/favicon.svg (same transparent svg) + regenerated 64×64 public/favicon.png; __root.tsx icon links now svg-first with png fallback, schema logo still /favicon.png. Old ks-logo/ks-logo-new asset pointers now unreferenced (left in place).
- 2026-11-02 (third pass): prompt8067.txt re-sent the same asset-migration + badge spec. Remaining gap closed: WorkshopsSection.tsx Unsplash hotlinks replaced with Lovable CDN asset pointers (yoga-for-strength-new, outdoor_mace_1, mace_pose). `rg` confirms zero external hotlinks in src (only legit links: canonical/OG, social, hero Bunny player, Cashfree API, Maps embed). Stale error reports: src/main.tsx, src/pages/Index.tsx, src/lib/utils.ts — none exist / file is 6 lines.
- 2026-11-02 (fourth pass): request1664.txt re-sent the Netlify/CORS asset-migration spec. Nothing to change: all asset URLs are already absolute (/__l5e/assets-v1/...), permanent, no CORS, lowercase names; no relative ./ paths or external background-image URLs found. /tmp/observability wiped by sandbox restart — logs rebuilt on next build. Stale error: src/pages/Index.tsx(16,15) — file doesn't exist.
- Cashfree keys, real prices, real class photos per card, real batch timetable for Immersions/Schedule — all placeholders.

## Stale errors (NOT real — do not chase) [continued]
- 2026-11-02 (fifth pass): reported `src/main.tsx(4,18) TS2741 Property 'variant' missing` — src/main.tsx does not exist (TanStack project, no entry-client/main files); also re-verified src/lib/utils.ts is 6 lines (clsx + twMerge only, no React import). Dismissed as stale.

## Uploaded files
- message6478.txt (2026-11-02): generic "feature specifications" header only — contains no actual feature list or spec content (ends with "lets do what its necessary to make it happen"). Nothing implementable inside; asked user for the real feature list.
