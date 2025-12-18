import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { authDB } from "@repo/db/auth-db";
import { toNextJsHandler } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(authDB, {
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
  }
});

export { toNextJsHandler };

export type Auth = ReturnType<typeof betterAuth>;
export type Session = Auth["$Infer"]["Session"];