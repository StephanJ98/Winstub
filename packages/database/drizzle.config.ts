import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env from the workspace root
dotenv.config({ path: resolve(process.cwd(), '../../.env') });

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schemas.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  }
})