import type { Handle } from "@sveltejs/kit";

export const metaHook: Handle = async ({ event, resolve }) => {
	return await resolve(event);
};
