import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { transactions } from "../db/schema";

const createTransaction = async (
	name: string,
	amount: number,
	box: number | null,
	financialAccount: number,
	year: string,
	month: string,
	day: string
) => {
	const date = `${year}-${month}-${day}`;
	return await db
		.insert(transactions)
		.values([{ name, amount, box, financialAccount, date }])
		.returning()
		.get();
};

const getTransactions = async () => {
	return await db.select().from(transactions).orderBy(desc(transactions.date));
};

const getTransactionById = async (id: number) => {
	return await db.select().from(transactions).where(eq(transactions.id, id)).get();
};

export const transaction = {
	createTransaction,
	getTransactions,
	getTransactionById
};
