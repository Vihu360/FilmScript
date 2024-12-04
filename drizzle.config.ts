import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:c7JurYl2SDgw@ep-falling-river-a541owzu.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
