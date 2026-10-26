import { createFileRoute } from "@tanstack/react-router";
import type { NeonBatchResult } from "@/lib/neon.server";

// Public, read-only health endpoint: proves the app's Neon path works end to
// end through the running app. Returns no PII and performs no writes; the
// Neon read runs as a read-only batch.
export const Route = createFileRoute("/api/public/health")({
  server: {
    handlers: {
      GET: async () => {
        const started = Date.now();
        try {
          const { neonQuery } = await import("@/lib/neon.server");
          const { results } = await neonQuery<NeonBatchResult>(
            [
              { query: "select current_database() as db, current_user as usr" },
              { query: "select count(*)::int as app_tables from information_schema.tables where table_schema = 'public'" },
            ],
            [],
            { "Neon-Batch-Read-Only": "true" },
          );
          const row = results[0].rows[0] ?? {};
          const tables = Number(results[1].rows[0]?.app_tables ?? 0);
          return Response.json({
            ok: true,
            database: "neon",
            db: row.db ?? null,
            appTables: tables,
            latencyMs: Date.now() - started,
          });
        } catch (err) {
          console.error("Neon health check failed:", err);
          const { neonUserError } = await import("@/lib/neon.server");
          const { status, message } = neonUserError(err);
          return Response.json({ ok: false, database: "neon", error: message }, { status });
        }
      },
    },
  },
});
