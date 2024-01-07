import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const financialAccounts = sqliteTable("financial_accounts", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull().unique(),
	currency_code: text("currency_code").notNull().unique(),
	currency_decimals: integer("currency_decimals").notNull(),
	date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`),
	date_updated: text("date_updated").default(sql`CURRENT_TIMESTAMP`)
});

export const boxes = sqliteTable("boxes", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	balance: integer("balance").notNull(),
	goal: integer("goal").notNull(),
	financial_account: integer("financial_account")
		.notNull()
		.references(() => financialAccounts.id),
	date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`),
	date_updated: text("date_updated").default(sql`CURRENT_TIMESTAMP`)
});

export const transactions = sqliteTable(
	"transactions",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		name: text("name").notNull().unique(),
		amount: integer("amount").notNull(),
		box: integer("box").references(() => boxes.id),
		financial_account: integer("financial_account").references(() => financialAccounts.id),
		year: integer("year").notNull(),
		month: integer("month").notNull(),
		day: integer("day").notNull(),
		date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`),
		date_updated: text("date_updated").default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => ({
		amountIdx: index("amount_index").on(table.amount)
	})
);
