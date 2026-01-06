import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "@repo/database/src";
import { toNextJsHandler } from "better-auth/next-js";
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env from the workspace root
dotenv.config({ path: resolve(process.cwd(), '../../../.env') });

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg"
  }),

  pages: {
    signIn: "/login",
  },

  trustedOrigins: process.env.NODE_ENV === "production"
    ? [
      process.env.APP1_URL,
      process.env.APP2_URL,
    ].filter((url): url is string => Boolean(url))
    : [
      "http://localhost:3000",
      "http://localhost:3001"
    ],

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  advanced: {
    database: {
      generateId: "uuid"
    }
  }
});

export { toNextJsHandler };

export type Auth = ReturnType<typeof betterAuth>;
export type Session = Auth["$Infer"]["Session"];