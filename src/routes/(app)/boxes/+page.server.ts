import type { PageServerLoad } from "./$types";
import { readItems } from "@directus/sdk";

export const load: PageServerLoad = async ({ locals }) => {
	const { apiClient, logger } = locals;

	logger.debug("Loading Boxes");

	return {
		boxes: await apiClient.request(
			readItems("boxes", {
				fields: [
					"name",
					"goal",
					"balance",
					{ financial_account: ["name", { currency: ["code", "decimals"] }] }
				]
			})
		)
	};
};
