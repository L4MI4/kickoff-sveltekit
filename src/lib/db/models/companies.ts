import { pgTable, text, timestamp, integer,} from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';
import { generateNanoId } from '../../utils/helpers/nanoid';
// import { Stocks } from './stocks';


export const Company = pgTable('Company', {
    id: text('id').primaryKey(),
    publicId: text('public_id')
      .notNull()
      .unique()
      .$default(() => generateNanoId()),
    // type: typeEnum('type').notNull().default('team'),
    companyname: text('company_name').notNull().unique(),
    address: text('address').notNull(),
    companynumber: integer('company_number').notNull(),
    licensenumber: text('license_number').notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
  });
// export const CompanyRelations = relations(Company, ({ many }) => ({
//     stocks: many(Stocks),
//   }));