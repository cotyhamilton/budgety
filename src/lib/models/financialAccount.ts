import { eq, sum } from "drizzle-orm";
import { db } from "../db/client";
import { financialAccounts, transactions } from "../db/schema";

const createFinancialAccount = async (
	name: string,
	currencyCode: string,
	currencyDecimals: number
) => {
	return await db
		.insert(financialAccounts)
		.values([{ name, currencyCode, currencyDecimals }])
		.returning()
		.get();
};

const getFinancialAccounts = async () => {
	return await db.select().from(financialAccounts);
};

const getFinancialAccountById = async (id: number) => {
	return await db.select().from(financialAccounts).where(eq(financialAccounts.id, id)).get();
};

export const getBalanceForAccountId = async (id: number) => {
	return await db
		.select({ balance: sum(transactions.amount) })
		.from(transactions)
		.where(eq(transactions.financialAccount, id))
		.get();
};

export const financialAccount = {
	createFinancialAccount,
	getFinancialAccounts,
	getFinancialAccountById,
	getBalanceForAccountId
};
