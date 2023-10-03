import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { schemaSnapshot } from "@directus/sdk";

export const GET: RequestHandler = async ({ locals }) => {
	const { apiClient } = locals;

	return json(await apiClient.request(schemaSnapshot()));
};
