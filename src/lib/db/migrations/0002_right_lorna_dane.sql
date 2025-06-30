ALTER TABLE "employees" RENAME COLUMN "user_id" TO "added_by";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "created_at" TO "added_at";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "updated_at" TO "edited_at";--> statement-breakpoint
ALTER TABLE "employees" DROP CONSTRAINT "employees_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "edited_by" text;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "removed_by" text;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "removed_at" timestamp;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;