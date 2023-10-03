import type { PageServerLoad } from "./$types";
import { aggregate } from "@directus/sdk";

export const load: PageServerLoad = async ({ locals }) => {
	const { apiClient, logger } = locals;

	logger.debug("Loading Balances");

	return {
		balances: await apiClient.request(
			aggregate("transactions", {
				aggregate: { sum: "amount" },
				groupBy: ["financial_account"]
			})
		)
	};
};
