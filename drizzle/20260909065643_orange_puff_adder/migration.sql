ALTER TABLE "links" ALTER COLUMN "id" SET DATA TYPE integer USING "id"::integer;--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "shortCode" SET DATA TYPE varchar(20) USING "shortCode"::varchar(20);