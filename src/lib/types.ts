import { boxes, financialAccounts, transactions } from "./db/schema";

export type Box = typeof boxes.$inferSelect;
export type FinancialAccount = typeof financialAccounts.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
