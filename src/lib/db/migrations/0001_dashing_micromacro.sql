CREATE TABLE IF NOT EXISTS "Company" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" text NOT NULL,
	"company_name" text NOT NULL,
	"address" text NOT NULL,
	"company_number" integer NOT NULL,
	"license_number" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "Company_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "Company_company_name_unique" UNIQUE("company_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Stock" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" text NOT NULL,
	"medicine_name" text NOT NULL,
	"quantity" integer NOT NULL,
	"company_name" text NOT NULL,
	"price_per_unit" integer NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "Stock_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "Stock_company_name_unique" UNIQUE("company_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Stock" ADD CONSTRAINT "Stock_company_name_Company_company_name_fk" FOREIGN KEY ("company_name") REFERENCES "Company"("company_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
