import type { PageServerLoad } from "./$types";
import { aggregate } from "@directus/sdk";

export const load: PageServerLoad = async ({ locals }) => {
	const { apiClient, logger } = locals;

	logger.debug("Loading Balances");

	const boxesAmount = (await apiClient.request(
		aggregate("boxes", {
			aggregate: { sum: "balance" },
			groupBy: ["financial_account"],
			query: {
				filter: {
					financial_account: {
						id: {
							_eq: 1
						}
					}
				}
			}
		})
	)) as { financial_account: number; sum: { balance: string } }[];

	const accountsAmount = (await apiClient.request(
		aggregate("transactions", {
			aggregate: { sum: "amount" },
			groupBy: ["financial_account"],
			query: {
				filter: {
					financial_account: {
						id: {
							_eq: 1
						}
					}
				}
			}
		})
	)) as { financial_account: number; sum: { amount: string } }[];

	const boxesByAccount = boxesAmount.reduce((acc, box) => {
		acc[box.financial_account] = (acc[box.financial_account] || 0) + parseInt(box.sum.balance);
		return acc;
	}, {} as Record<string, number>);

	const accountsByAccount = accountsAmount.reduce((acc, account) => {
		acc[account.financial_account] =
			(acc[account.financial_account] || 0) + parseInt(account.sum.amount);
		return acc;
	}, {} as Record<string, number>);

	const safeToSpend = Object.keys(boxesByAccount).map((account) => ({
		financial_account: parseInt(account),
		sum: {
			difference: (accountsByAccount[account] || 0) - (boxesByAccount[account] || 0)
		}
	}));

	return {
		balances: {
			boxesAmount,
			accountsAmount,
			safeToSpend
		}
	};
};
