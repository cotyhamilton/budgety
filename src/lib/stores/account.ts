import { getDatabase } from "$lib/db";
import { financialAccount } from "$lib/models/financialAccount";
import type { FinancialAccount } from "$lib/types";
import { asyncReadable, writable } from "@square/svelte-store";

export const currentAccount = writable<FinancialAccount>();

export const accounts = asyncReadable<FinancialAccount[]>(
	[],
	async () => {
		return await financialAccount.getFinancialAccounts(await getDatabase());
	},
	{ reloadable: true }
);
