import { convertFromSubunits, formatter } from "$lib/currencies";
import { financialAccount, getBalanceForAccountId } from "$lib/models/financialAccount";
import type { FinancialAccount } from "$lib/types";
import { asyncDerived, asyncReadable, writable } from "@square/svelte-store";
import { transactions } from "./transaction";

export const currentAccount = writable<FinancialAccount>();

export const accounts = asyncReadable<FinancialAccount[]>(
	[],
	async () => {
		return await financialAccount.getFinancialAccounts();
	},
	{ reloadable: true }
);

export const currentBalance = asyncDerived(
	[currentAccount, transactions],
	async ([$currentAccount]) => {
		const { balance } = await getBalanceForAccountId($currentAccount.id);
		const formatted = formatter($currentAccount?.currencyCode).format(
			convertFromSubunits(balance, $currentAccount?.currencyDecimals)
		);
		return {
			raw: balance,
			formatted
		};
	},
	{ reloadable: true }
);
