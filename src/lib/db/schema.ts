import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const financialAccounts = sqliteTable("financial_accounts", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull().unique(),
	currencyCode: text("currency_code").notNull().unique(),
	currencyDecimals: integer("currency_decimals").notNull(),
	dateCreated: text("date_created").default(sql`CURRENT_TIMESTAMP`),
	dateUpdated: text("date_updated").default(sql`CURRENT_TIMESTAMP`)
});

export const boxes = sqliteTable("boxes", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	balance: integer("balance").notNull(),
	goal: integer("goal").notNull(),
	financialAccount: integer("financial_account")
		.notNull()
		.references(() => financialAccounts.id),
	dateCreated: text("date_created").default(sql`CURRENT_TIMESTAMP`),
	dateUpdated: text("date_updated").default(sql`CURRENT_TIMESTAMP`)
});

export const transactions = sqliteTable(
	"transactions",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		name: text("name").notNull().unique(),
		amount: integer("amount").notNull(),
		box: integer("box").references(() => boxes.id),
		financialAccount: integer("financial_account").references(() => financialAccounts.id),
		year: integer("year").notNull(),
		month: integer("month").notNull(),
		day: integer("day").notNull(),
		dateCreated: text("date_created").default(sql`CURRENT_TIMESTAMP`),
		dateUpdated: text("date_updated").default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => ({
		amountIdx: index("amount_idx").on(table.amount)
	})
);

export const boxesRelations = relations(boxes, ({ many }) => ({
	tx: many(transactions)
}));

export const txRelations = relations(transactions, ({ one }) => ({
	box: one(boxes, { fields: [transactions.box], references: [boxes.id] })
}));
