import { sequence } from "@sveltejs/kit/hooks";
import type { HandleServerError } from "@sveltejs/kit";
import { authHook } from "$lib/server/auth";
import { logHook } from "$lib/server/logger";

export const handle = sequence(logHook, authHook);

export const handleError: HandleServerError = async ({ error, event }) => {
	if (error instanceof Error) {
		event.locals.logger.error({
			error: {
				...error,
				stack: error?.stack
			}
		});
	} else {
		event.locals.logger.error({
			error
		});
	}

	return {
		message: "Oops ... an error occurred",
		id: event.locals.trace
	};
};
