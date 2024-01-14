import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { transactions } from "../db/schema";
import type { TransactionCreate } from "../types";

const createTransaction = async ({
	name,
	amount,
	box,
	financialAccount,
	year,
	month,
	day,
	adjustment = false
}: TransactionCreate & {
	year: string;
	month: string;
	day: string;
	adjustment?: boolean;
}) => {
	const date = `${year}-${month}-${day}`;
	return await db
		.insert(transactions)
		.values([{ name, amount, box, financialAccount, date, adjustment }])
		.returning()
		.get();
};

const getTransactions = async () => {
	return await db.query.transactions.findMany({
		with: { box: true },
		orderBy: [desc(transactions.date)]
	});
};

const getTransactionById = async (id: number) => {
	return await db.select().from(transactions).where(eq(transactions.id, id)).get();
};

export const transaction = {
	createTransaction,
	getTransactions,
	getTransactionById
};
