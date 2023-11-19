import { getDatabase } from "$lib/db";
import { box } from "$lib/models/box";
import type { Box } from "$lib/types";
import { asyncReadable } from "@square/svelte-store";

export const boxes = asyncReadable<Box[]>(
	[],
	async () => {
		return await box.getBoxes(await getDatabase());
	},
	{ reloadable: true }
);
