CREATE TYPE "public"."role_enum" AS ENUM('admin', 'user', 'market');--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "league_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "role" "role_enum" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "balance" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "banned" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "collection" ADD CONSTRAINT "collection_league_id_league_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."league"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prediction_user_match_idx" ON "prediction" USING btree ("user_id","match_id");--> statement-breakpoint
CREATE INDEX "profile_userId_idx" ON "profile" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "statistic_match_player_idx" ON "statistic" USING btree ("match_id","player_id");--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "avatar";