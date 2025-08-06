CREATE TYPE "public"."social_media" AS ENUM('facebook', 'linkedin');--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"output" text NOT NULL,
	"date" timestamp with time zone,
	"image_url" text,
	"posted" boolean DEFAULT false NOT NULL,
	"social_network" "social_media"
);
