import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schemas",
  out: "./src-tauri/migrations",
  driver: "d1-http",
  dialect: "sqlite",
  verbose: false,
  strict: true,
});
