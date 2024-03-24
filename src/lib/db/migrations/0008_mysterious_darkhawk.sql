ALTER TABLE "Stock" DROP CONSTRAINT "Stock_company_name_Company_company_name_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Stock" ADD CONSTRAINT "Stock_company_name_Company_company_name_fk" FOREIGN KEY ("company_name") REFERENCES "Company"("company_name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
