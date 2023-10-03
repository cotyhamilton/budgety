import type { Handle, RequestEvent } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { readMe, refresh } from "@directus/sdk";
import { apiClient } from "./api";

export const deleteTokens = (event: RequestEvent) => {
	event.cookies.delete("access_token");
	event.cookies.delete("refresh_token");
	event.locals.access_token = undefined;
	event.locals.refresh_token = undefined;
};

export const authHook: Handle = async ({ event, resolve }) => {
	const logger = event.locals.logger;
	logger.debug("Auth Hook Started");

	// get tokens from cookies
	const access_token = event.cookies.get("access_token");
	const refresh_token = event.cookies.get("refresh_token");

	// save tokens
	event.locals.access_token = access_token;
	event.locals.refresh_token = refresh_token;

	// save api client
	const client = apiClient(env.API_URL);
	event.locals.apiClient = client;

	// no tokens found
	if (!access_token && !refresh_token) {
		logger.debug({ info: "No access_token nor refresh_token" }, "Auth Hook Finished");
		deleteTokens(event);
		return await resolve(event);
	}

	// refresh tokens, we always have a valid access_token for the next request
	if (refresh_token) {
		logger.debug("Refresh Token Started");
		try {
			const result = await client.request(refresh("json", refresh_token));

			if (result.access_token && result.refresh_token && result.expires) {
				// update api client with new token
				client.setToken(result.access_token);
				const user = await client.request(readMe());
				logger.setBindings({ user: user?.id });
				logger.debug({ info: "Setting access_token and refresh_token" }, "Refresh Token Success");

				// save tokens
				event.locals.access_token = result.access_token;
				event.locals.refresh_token = result.refresh_token;
				event.cookies.set("refresh_token", result.refresh_token, {
					path: "/",
					httpOnly: true,
					sameSite: "strict",
					maxAge: 60 * 60 * 24 * 7 // make configurable
				});
			}
		} catch (error) {
			logger.warn(
				{ info: "Deleting access_token and refresh_token", error },
				"Refresh Token Failed"
			);
			deleteTokens(event);
		}
		logger.debug("Refresh Token Finished");
	}
	logger.debug("Auth Hook Finished");
	return await resolve(event);
};
