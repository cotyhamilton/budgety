import { convertFromSubunits, formatter } from "$lib/currencies";
import { financialAccount, getAllBalancesForAccountId } from "$lib/models/financialAccount";
import type { FinancialAccount } from "$lib/types";
import { asyncDerived, asyncWritable, writable } from "@square/svelte-store";
import { boxes } from "./boxes";
import { transactions } from "./transaction";

export const currentAccount = writable<FinancialAccount>();

export const accounts = asyncWritable(
	[],
	async () => {
		return await financialAccount.getFinancialAccounts();
	},
	undefined,
	{ reloadable: true }
);

export const currentAccountBalances = asyncDerived(
	[currentAccount, transactions, boxes],
	async ([$currentAccount]) => {
		const balances = await getAllBalancesForAccountId($currentAccount.id);

		const formattedBalance = formatter($currentAccount?.currencyCode).format(
			convertFromSubunits(+balances.balance, $currentAccount?.currencyDecimals)
		);
		const formattedBoxesBalance = formatter($currentAccount?.currencyCode).format(
			convertFromSubunits(+balances.boxes, $currentAccount?.currencyDecimals)
		);
		const formattedSafeBalance = formatter($currentAccount?.currencyCode).format(
			convertFromSubunits(+balances.safe, $currentAccount?.currencyDecimals)
		);
		return {
			actual: {
				raw: balances.balance,
				formatted: formattedBalance
			},
			boxes: {
				raw: balances.boxes,
				formatted: formattedBoxesBalance
			},
			safe: {
				raw: balances.safe,
				formatted: formattedSafeBalance
			}
		};
	},
	{ reloadable: true }
);
