import type { PageServerLoad } from "./$types";
import { readItems } from "@directus/sdk";

export const load: PageServerLoad = async ({ locals }) => {
	const { apiClient, logger } = locals;

	logger.debug("Loading Currencies");

	return {
		currencies: await apiClient.request(
			readItems("currency", {
				fields: ["code", "decimals"]
			})
		)
	};
};
