import { redirect, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";

export const load: PageServerLoad = () => {
	return {
		form: superValidate(formSchema)
	};
};

export const actions = {
	default: async ({ cookies, request, url, locals }) => {
		const { logger } = locals;
		logger.debug("Login Started");

		const form = await superValidate(request, formSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;

		let success = false;

		try {
			const { apiClient } = locals;
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

		return setError(form, "", "invalid email or password");
	}
} satisfies Actions;
