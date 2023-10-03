import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
	default: async ({ cookies, request, url, locals }) => {
		const { logger } = locals;
		logger.debug("Login Started");

		const data = await request.formData();
		const email = data.get("email");
		const password = data.get("password");

		let success = false;

		// add zod
		if (typeof email === "string" && typeof password === "string") {
			const { apiClient } = locals;

			try {
				const { refresh_token } = await apiClient.login(email, password);

				if (refresh_token) {
					cookies.set("refresh_token", refresh_token, {
						path: "/",
						httpOnly: true,
						sameSite: "strict",
						maxAge: 60 * 60 * 24 * 7 // make configurable
					});

					success = true;
				}
			} catch (error) {
				logger.debug({ error }, "Login Failed");
			}
		}

		if (success) {
			const redirectTo = url.searchParams.get("redirectTo");
			logger.debug({ redirect: redirectTo || "/accounts" }, "Login Success");
			logger.debug("Login Finished");
			throw redirect(303, "/" + (redirectTo?.substring(1) || "accounts"));
		}

		logger.debug({ info: "Deleting cookies" }, "Login Failed");

		cookies.delete("access_token");
		cookies.delete("refresh_token");

		logger.debug("Login Finished");
	}
} satisfies Actions;
