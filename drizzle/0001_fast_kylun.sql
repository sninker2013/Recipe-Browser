CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "directions" (
	"recipeId" integer NOT NULL,
	"position" integer NOT NULL,
	"instruction" varchar NOT NULL,
	CONSTRAINT "directions_recipeId_position_pk" PRIMARY KEY("recipeId","position")
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"recipe_id" integer NOT NULL,
	"position" integer NOT NULL,
	"name" varchar NOT NULL,
	"amount" varchar NOT NULL,
	CONSTRAINT "ingredients_recipe_id_position_pk" PRIMARY KEY("recipe_id","position")
);
--> statement-breakpoint
CREATE TABLE "recipe_categories" (
	"recipe_id" integer NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recipes" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "description" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "author" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "prep_time" interval hour to minute NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "cook_time" interval hour to minute NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "servings" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directions" ADD CONSTRAINT "directions_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_slug_unique" UNIQUE("slug");