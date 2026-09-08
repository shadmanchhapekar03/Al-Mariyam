import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema";

// Initialize db - will use Netlify env vars at runtime
// For build time, provide a valid placeholder connection string if not available
const connectionString = process.env.NETLIFY_DB_URL || "postgresql://user:password@localhost:5432/placeholder";

export const db = drizzle({
  connection: connectionString,
  schema,
});
