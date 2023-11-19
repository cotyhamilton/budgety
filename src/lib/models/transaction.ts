import type { Transaction } from "$lib/types";
import type { DB } from "@vlcn.io/crsqlite-wasm";

const createTransaction = async (
	db: DB,
	name: string,
	amount: number | null,
	box: number,
	financialAccount: number,
	year: number,
	month: number,
	day: number
): Promise<void> => {
	await db.exec(
		"INSERT INTO transactions (name, amount, box, financial_account, year, month, day) VALUES (?, ?, ?, ?, ?, ?, ?);",
		[name, amount, box, financialAccount, year, month, day]
	);
};

const getTransactions = async (db: DB): Promise<Transaction[]> => {
	const result = await db.execO<Transaction>("SELECT * FROM transactions;");
	return result;
};

const getTransactionById = async (db: DB, id: number) => {
	const result = await db.execO<Transaction>("SELECT * FROM transactions WHERE id = ?;", [id]);
	return result.length > 0 ? result[0] : undefined;
};

export const transaction = {
	createTransaction,
	getTransactions,
	getTransactionById
};
