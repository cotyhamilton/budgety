import { getDatabase } from "$lib/db";
import type { Transaction } from "$lib/types";
import { asyncReadable } from "@square/svelte-store";
import { transaction } from "../models/transaction";

export const transactions = asyncReadable<Transaction[]>(
	[],
	async () => {
		return await transaction.getTransactions(await getDatabase());
	},
	{ reloadable: true }
);
