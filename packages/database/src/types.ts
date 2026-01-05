import { InferSelectModel } from 'drizzle-orm';
import { account, session, user, verification } from './schema';

export type User = InferSelectModel<typeof user>;
export type Account = InferSelectModel<typeof account>;
export type Session = InferSelectModel<typeof session>;
export type Verification = InferSelectModel<typeof verification>;