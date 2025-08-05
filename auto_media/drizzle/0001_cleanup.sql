ALTER TABLE "posts" ALTER COLUMN "date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "date" SET NOT NULL;