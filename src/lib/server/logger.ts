import { env } from "$env/dynamic/private";
import type { Handle } from "@sveltejs/kit";
import pino from "pino";

export const logger = pino({
	level: env.LOG_LEVEL || "info"
});

export const logHook: Handle = async ({ event, resolve }) => {
	const requestStartTime = Date.now();
	const trace = crypto.randomUUID();
	event.locals.trace = trace;

	// save child logger with trace id
	event.locals.logger = logger.child({
		trace
	});

	// log http request start
	event.locals.logger.info(
		{
			method: event.request.method,
			path: event.url.pathname
		},
		"HTTP Request Started"
	);

	// wait for request to finish
	const response = await resolve(event);

	// log http request finish
	event.locals.logger.info(
		{
			method: event.request.method,
			path: event.url.pathname,
			duration: `${Date.now() - requestStartTime}ms`,
			status: response.status
		},
		"HTTP Request Finished"
	);

	return response;
};
