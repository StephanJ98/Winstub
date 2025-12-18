import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _authDb: NeonHttpDatabase<typeof schema> | null = null;

export const getAuthDb = () => {
  if (_authDb) return _authDb;

  const conectionString = process.env.AUTH_DATABASE_URL;
  if (!conectionString) throw new Error("AUTH_DATABASE_URL is not set");

  _authDb = drizzle(conectionString, { schema });
  return _authDb;
}

export const authDB = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get: (_, prop) => getAuthDb()[prop as keyof NeonHttpDatabase<typeof schema>],
})