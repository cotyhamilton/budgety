import { asyncReadable } from "@square/svelte-store";
import { transaction } from "../models/transaction";

export const transactions = asyncReadable(
	[],
	async () => {
		return await transaction.getTransactions();
	},
	{ reloadable: true }
);
