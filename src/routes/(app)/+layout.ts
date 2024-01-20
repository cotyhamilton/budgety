import { db } from "$lib/db/client";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load = (async () => {
	const accounts = await db.query.financialAccounts.findMany();

	if (!accounts.length) {
		redirect(307, "/create-account");
	}

	return {
		accounts,
		currentAccount: accounts.find((account) => account.isPrimary)
	};
}) satisfies LayoutLoad;
