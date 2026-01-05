import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schemas/index.schema';
import { resolve } from 'path';

// Load .env from the workspace root
dotenv.config({ path: resolve(process.cwd(), '../../.env') });

const connectionString = process.env.DATABASE_URL || '';
const client = postgres(connectionString);

const db = drizzle(client, { schema });

export default db;
