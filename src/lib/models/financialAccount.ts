import { db } from "$lib/db/client";
import { boxes, financialAccounts, transactions } from "$lib/db/schema";
import { and, eq, sum } from "drizzle-orm";
import type { FinancialAccountCreate } from "../types";

const createFinancialAccount = async ({
	name,
	currencyCode,
	currencyDecimals,
	isPrimary = false
}: FinancialAccountCreate) => {
	return await db
		.insert(financialAccounts)
		.values([{ name, currencyCode, currencyDecimals, isPrimary }])
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
		.where(and(eq(transactions.financialAccount, id), eq(transactions.adjustment, false)))
		.get();
};

export const getBoxesBalanceForAccountId = async (id: number) => {
	return await db
		.select({ balance: sum(boxes.balance) })
		.from(boxes)
		.where(eq(boxes.financialAccount, id))
		.get();
};

export const getAllBalancesForAccountId = async (id: number) => {
	const balances = {
		balance: 0,
		boxes: 0,
		safe: 0
	};
	balances.balance = +((await getBalanceForAccountId(id))?.balance ?? 0);
	balances.boxes = +((await getBoxesBalanceForAccountId(id))?.balance ?? 0);
	balances.safe = balances.balance - balances.boxes;
	return balances;
};

export const financialAccount = {
	createFinancialAccount,
	getFinancialAccounts,
	getFinancialAccountById,
	getBalanceForAccountId,
	getBoxesBalanceForAccountId,
	getAllBalancesForAccountId
};
