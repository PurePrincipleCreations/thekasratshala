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
- Cashfree keys, real prices, real class photos per card, real batch timetable for Immersions/Schedule — all placeholders.
