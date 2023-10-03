import type { PageServerLoad } from "./$types";
import { readItems } from "@directus/sdk";

export const load: PageServerLoad = async ({ locals }) => {
	const { apiClient, logger } = locals;

	logger.debug("Loading Accounts");

	return {
		accounts: await apiClient.request(
			readItems("financial_accounts", {
				fields: ["id", "name", { currency: ["code", "decimals"] }]
			})
		)
	};
};
