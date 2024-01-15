import { db } from "$lib/db/client";
import { boxes, transactions } from "$lib/db/schema";
import type { TransactionCreate } from "$lib/types";
import { desc, eq, sql } from "drizzle-orm";

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
	if (box) {
		return await db.transaction(async (tx) => {
			await tx
				.update(boxes)
				.set({ balance: sql`${boxes.balance} + ${amount}` })
				.where(eq(boxes.id, box));
			return await tx
				.insert(transactions)
				.values([{ name, amount, box, financialAccount, date, adjustment: amount > 0 }])
				.returning()
				.get();
		});
	} else {
		return await db
			.insert(transactions)
			.values([{ name, amount, box, financialAccount, date, adjustment }])
			.returning()
			.get();
	}
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
