import type { PageServerLoad } from "./$types";
import { readItems } from "@directus/sdk";

export const load: PageServerLoad = async ({ locals }) => {
	const { apiClient, logger } = locals;

	logger.debug("Loading Transactions");

	return {
		transactions: await apiClient.request(
			readItems("transactions", {
				fields: [
					"name",
					"amount",
					"date",
					{ box: ["name"] },
					{ financial_account: ["name", { currency: ["code", "decimals"] }] }
				]
			})
		)
	};
};
