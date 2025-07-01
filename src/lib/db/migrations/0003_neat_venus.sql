ALTER TABLE "devices" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "devices" ADD COLUMN "image_url" text;