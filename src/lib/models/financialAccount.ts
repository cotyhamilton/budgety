import { eq, sum } from "drizzle-orm";
import { db } from "../db";
import { financialAccounts, transactions } from "../db/schema";

const createFinancialAccount = async (
	name: string,
	currencyCode: string,
	currencyDecimals: number
) => {
	await db.insert(financialAccounts).values([{ name, currencyCode, currencyDecimals }]);
};

const getFinancialAccounts = async () => {
	const result = await db.select().from(financialAccounts);
	return result;
};

const getFinancialAccountById = async (id: number) => {
	const result = await db.select().from(financialAccounts).where(eq(financialAccounts.id, id));
	return result.length > 0 ? result[0] : undefined;
};

export const getBalanceForAccountId = async (id: number) => {
	const result = await db
		.select({ balance: sum(transactions.amount) })
		.from(transactions)
		.where(eq(transactions.financialAccount, id));

	return result[0];
};

export const financialAccount = {
	createFinancialAccount,
	getFinancialAccounts,
	getFinancialAccountById,
	getBalanceForAccountId
};
