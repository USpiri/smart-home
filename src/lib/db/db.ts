import Database from "@tauri-apps/plugin-sql";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schemas/";

export const sqlite = await Database.load("sqlite:minecoords.db");

export const db = drizzle<typeof schema>(
  async (sql, params, method) => {
    try {
      if (isSelectQuery(sql) || hasReturningClause(sql)) {
        // eslint-disable-next-line
        const dbRows = (await sqlite.select(sql, params)) as Record<
          string,
          unknown
        >[];
        const mappedRows = dbRows.map((row) => Object.values(row));
        const results = method === "all" ? mappedRows : mappedRows[0];

        return { rows: results };
      } else {
        await sqlite.execute(sql, params);
        return { rows: [] };
      }
    } catch (e) {
      console.error("SQL Error:", e);
      throw e;
    }
  },
  { schema, logger: true },
);

function isSelectQuery(sql: string): boolean {
  const selectRegex = /^\s*SELECT\b/i;
  return selectRegex.test(sql);
}

function hasReturningClause(sql: string): boolean {
  const returningRegex = /\bRETURNING\b/i;
  return returningRegex.test(sql);
}
