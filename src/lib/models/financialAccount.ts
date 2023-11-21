import type { FinancialAccount } from "$lib/types";
import type { DB } from "@vlcn.io/crsqlite-wasm";

const createFinancialAccount = async (
	db: DB,
	name: string,
	currencyCode: string,
	currencyDecimals: number
) => {
	await db.exec(
		"INSERT INTO financial_accounts (name, currency_code, currency_decimals) VALUES (?, ?, ?);",
		[name, currencyCode, currencyDecimals]
	);
};

const getFinancialAccounts = async (db: DB): Promise<FinancialAccount[]> => {
	return await db.execO<FinancialAccount>("SELECT * FROM financial_accounts;");
};

const getFinancialAccountById = async (db: DB, id: number) => {
	const result = await db.execO<FinancialAccount>(
		"SELECT * FROM financial_accounts WHERE id = ?;",
		[id]
	);
	return result.length > 0 ? result[0] : undefined;
};

export const getBalanceForAccountId = async (db: DB, id: number) => {
	const result = await db.execO<{ balance: number }>(
		`
		SELECT SUM(amount) AS balance
		FROM transactions
		WHERE financial_account = ?
	`,
		[id]
	);
	return result[0];
};

export const financialAccount = {
	createFinancialAccount,
	getFinancialAccounts,
	getFinancialAccountById,
	getBalanceForAccountId
};
