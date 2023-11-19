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
	const result = await db.execO<FinancialAccount>("SELECT * FROM financial_accounts;");
	return result;
};

const getFinancialAccountById = async (db: DB, id: number) => {
	const result = await db.execO<FinancialAccount>(
		"SELECT * FROM financial_accounts WHERE id = ?;",
		[id]
	);
	return result.length > 0 ? result[0] : undefined;
};

export const financialAccount = {
	createFinancialAccount,
	getFinancialAccounts,
	getFinancialAccountById
};
