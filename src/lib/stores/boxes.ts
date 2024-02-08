import type { Box } from "$lib/types";
import { asyncReadable } from "@square/svelte-store";
import { db } from "../db/client";

export const boxes = asyncReadable<Box[]>(
	[],
	async () => {
		return await db.query.boxes.findMany({ with: { tx: true } });
	},
	{ reloadable: true }
);
