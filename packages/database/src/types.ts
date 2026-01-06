import { InferEnum, InferSelectModel } from 'drizzle-orm';
import {
  account,
  session,
  user,
  verification,
  event,
  eventTypeEnum,
  league,
  match,
  player,
  prediction,
  statistic,
  statusEnum,
  team,
  card,
  collection,
  marketplaceListing,
  marketplaceOffer,
  transaction,
  transactionStatusEnum,
  userProfile
} from './schemas';

// Auth types
export type User = InferSelectModel<typeof user>;
export type Account = InferSelectModel<typeof account>;
export type Session = InferSelectModel<typeof session>;
export type Verification = InferSelectModel<typeof verification>;

// Enum types
export type EventType = InferEnum<typeof eventTypeEnum>;
export type Status = InferEnum<typeof statusEnum>;
export type TransactionStatus = InferEnum<typeof transactionStatusEnum>;

// Application types
export type League = InferSelectModel<typeof league>;
export type Team = InferSelectModel<typeof team>;
export type Player = InferSelectModel<typeof player>;
export type Match = InferSelectModel<typeof match>;
export type Statistic = InferSelectModel<typeof statistic>;
export type Event = InferSelectModel<typeof event>;
export type Prediction = InferSelectModel<typeof prediction>;
export type Card = InferSelectModel<typeof card>;
export type Collection = InferSelectModel<typeof collection>;
export type Transaction = InferSelectModel<typeof transaction>;
export type MarketplaceListing = InferSelectModel<typeof marketplaceListing>;
export type MarketplaceOffer = InferSelectModel<typeof marketplaceOffer>;
export type UserProfile = InferSelectModel<typeof userProfile>;