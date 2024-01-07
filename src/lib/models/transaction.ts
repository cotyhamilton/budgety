import { eq } from "drizzle-orm";
import { db } from "../db";
import { transactions } from "../db/schema";

const createTransaction = async (
	name: string,
	amount: number,
	box: number | null,
	financialAccount: number,
	year: number,
	month: number,
	day: number
): Promise<void> => {
	await db.insert(transactions).values([{ name, amount, box, financialAccount, year, month, day }]);
};

const getTransactions = async () => {
	const result = await db.select().from(transactions);
	return result;
};

const getTransactionById = async (id: number) => {
	const result = await db.select().from(transactions).where(eq(transactions.id, id));
	return result.length > 0 ? result[0] : undefined;
};

export const transaction = {
	createTransaction,
	getTransactions,
	getTransactionById
};
