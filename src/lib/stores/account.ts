import { convertFromSubunits, formatter } from "$lib/currencies";
import { getDatabase } from "$lib/db";
import { financialAccount, getBalanceForAccountId } from "$lib/models/financialAccount";
import type { FinancialAccount } from "$lib/types";
import { asyncDerived, asyncReadable, writable } from "@square/svelte-store";

export const currentAccount = writable<FinancialAccount>();

export const accounts = asyncReadable<FinancialAccount[]>(
	[],
	async () => {
		return await financialAccount.getFinancialAccounts(await getDatabase());
	},
	{ reloadable: true }
);

export const currentBalance = asyncDerived(
	[currentAccount],
	async ([$currentAccount]) => {
		const { balance } = await getBalanceForAccountId(await getDatabase(), $currentAccount.id);
		const formatted = formatter($currentAccount?.currency_code).format(
			convertFromSubunits(balance, $currentAccount?.currency_decimals));
		return {
			raw: balance,
			formatted
		}
	},
	{ reloadable: true }
);