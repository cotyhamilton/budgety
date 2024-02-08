import { asyncReadable } from "@square/svelte-store";
import { desc } from "drizzle-orm";
import { db } from "../db/client";
import { transactions as schema } from "../db/schema";

export const transactions = asyncReadable(
	[],
	async () => {
		return await db.query.transactions.findMany({
			with: { box: true },
			orderBy: [desc(schema.date)]
		});
	},
	{ reloadable: true }
);
