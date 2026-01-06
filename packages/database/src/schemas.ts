import { pgTable, text, timestamp, pgEnum, integer, boolean, index, uuid } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

const baseSchemaFields = {
  id: uuid("id").default(sql`pg_catalog.gen_random_uuid()`).primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
};

export const user = pgTable("user", {
  ...baseSchemaFields,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
});

export const session = pgTable("session", {
  ...baseSchemaFields,
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
},
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable("account", {
  ...baseSchemaFields,
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
},
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable("verification", {
  ...baseSchemaFields,
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
},
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const league = pgTable("league", {
  ...baseSchemaFields,
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
});

export const team = pgTable("team", {
  ...baseSchemaFields,
  name: text("name").notNull(),
  image: text("image"),
  league_id: uuid("league_id").notNull().references(() => league.id, { onDelete: "cascade" }),
});

export const player = pgTable("player", {
  ...baseSchemaFields,
  name: text("name").notNull(),
  position: text("position"),
  number: text("number"),
  image: text("image"),
  team_id: uuid("team_id").notNull().references(() => team.id, { onDelete: "cascade" }),
});

export const statusEnum = pgEnum("status_enum", ["scheduled", "in_progress", "completed", "postponed"]);

export const match = pgTable("match", {
  ...baseSchemaFields,
  homeTeamId: uuid("home_team_id").notNull().references(() => team.id, { onDelete: "cascade" }),
  awayTeamId: uuid("away_team_id").notNull().references(() => team.id, { onDelete: "cascade" }),
  leagueId: uuid("league_id").notNull().references(() => league.id, { onDelete: "cascade" }),
  matchDate: timestamp("match_date").notNull(),
  status: statusEnum("status").notNull().default("scheduled"),
  homeTeamScore: integer("home_team_score").notNull().default(0),
  awayTeamScore: integer("away_team_score").notNull().default(0),
});

export const playerRatings = pgTable("player_ratings", {
  ...baseSchemaFields,
  matchId: uuid("match_id").notNull().references(() => match.id, { onDelete: "cascade" }),
  playerId: uuid("player_id").notNull().references(() => player.id, { onDelete: "cascade" }),
  points: integer("points").notNull().default(0),
  events: uuid("events").array().notNull().default([]),
});

export const eventTypeEnum = pgEnum("event_type_enum", ["goal", "yellow_card", "red_card", "substitution", "penalty", "own_goal", "injury", "corner", "free_kick", "offside", "throw_in", "foul", "save", "kickoff", "penalty_shootout", "other"]);

export const event = pgTable("event", {
  ...baseSchemaFields,
  matchId: uuid("match_id").notNull().references(() => match.id, { onDelete: "cascade" }),
  playerId: uuid("player_id").notNull().references(() => player.id, { onDelete: "cascade" }),
  eventType: eventTypeEnum("event_type").notNull(),
  eventTime: integer("event_time").notNull(),
  description: text("description"),
});

export const statistic = pgTable("statistic", {
  ...baseSchemaFields,
  matchId: uuid("match_id").notNull().references(() => match.id, { onDelete: "cascade" }),
  playerId: uuid("player_id").notNull().references(() => player.id, { onDelete: "cascade" }),
  minutesPlayed: integer("minutes_played").notNull().default(0),
  goals: integer("goals").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  yellowCards: integer("yellow_cards").notNull().default(0),
  redCards: integer("red_cards").notNull().default(0),
  shotsOnTarget: integer("shots_on_target").notNull().default(0),
  passesCompleted: integer("passes_completed").notNull().default(0),
  tackles: integer("tackles").notNull().default(0),
});

export const prediction = pgTable("prediction", {
  ...baseSchemaFields,
  matchId: uuid("match_id").notNull().references(() => match.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  predictedHomeScore: integer("predicted_home_score").notNull(),
  predictedAwayScore: integer("predicted_away_score").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  amountWagered: integer("amount_wagered").notNull().default(0),
  multiplier: integer("multiplier").notNull().default(1),
});

export const collection = pgTable("collection", {
  ...baseSchemaFields,
  userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const card = pgTable("card", {
  ...baseSchemaFields,
  playerId: uuid("player_id").notNull().references(() => player.id, { onDelete: "cascade" }),
  ownerId: uuid("owner_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  collectionId: uuid("collection_id").references(() => collection.id, { onDelete: "set null" }),
  rarity: text("rarity").notNull(),
  marketValue: integer("market_value").notNull().default(1),
  shielded: boolean("shielded").notNull().default(false),
  currentValue: integer("current_value").notNull().default(1),
});

export const transactionStatusEnum = pgEnum("transaction_status_enum", ["pending", "completed", "failed", "paused", "cancelled"]);

export const transaction = pgTable("transaction", {
  ...baseSchemaFields,
  cardId: uuid("card_id").notNull().references(() => card.id, { onDelete: "cascade" }),
  buyerId: uuid("buyer_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  sellerId: uuid("seller_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  price: integer("price").notNull().default(1),
  status: transactionStatusEnum("status").notNull().default("pending"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
});

export const marketplaceListing = pgTable("marketplace_listing", {
  ...baseSchemaFields,
  cardId: uuid("card_id").notNull().references(() => card.id, { onDelete: "cascade" }),
  sellerId: uuid("seller_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  price: integer("price").notNull().default(1),
  isActive: boolean("is_active").notNull().default(true),
});

export const marketplaceOffer = pgTable("marketplace_offer", {
  ...baseSchemaFields,
  listingId: uuid("listing_id").notNull().references(() => marketplaceListing.id, { onDelete: "cascade" }),
  buyerId: uuid("buyer_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  offerPrice: integer("offer_price").notNull().default(1),
  status: transactionStatusEnum("status").notNull().default("pending"),
});

export const profile = pgTable("profile", {
  ...baseSchemaFields,
  userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  bio: text("bio"),
  avatar: text("avatar"),
  favoriteTeamId: uuid("favorite_team_id").references(() => team.id, { onDelete: "set null" }),
});
