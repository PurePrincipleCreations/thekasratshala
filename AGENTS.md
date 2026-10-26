<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Neon (Postgres) is connected via the Lovable Neon connector. All database access
  goes through `src/lib/neon.server.ts` (Lovable connector gateway, `POST /neon/sql`);
  import it only inside server fn/route handler bodies via `await import('@/lib/neon.server')`.
  Never connect to Neon directly, never use a Postgres client library, and never put a
  connection string in app code — the gateway holds it. Public proof endpoint:
  `GET /api/public/health` (read-only batch). DDL/migrations run once via the connector
  in chat, never at request time.
