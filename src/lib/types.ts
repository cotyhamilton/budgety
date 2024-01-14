import { boxes, financialAccounts, transactions } from "./db/schema";

export type Box = typeof boxes.$inferSelect;
export type BoxCreate = typeof boxes.$inferInsert;

export type FinancialAccount = typeof financialAccounts.$inferSelect;
export type FinancialAccountCreate = typeof financialAccounts.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type TransactionCreate = typeof transactions.$inferInsert;
