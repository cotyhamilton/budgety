import { box } from "$lib/models/box";
import type { Box } from "$lib/types";
import { asyncReadable } from "@square/svelte-store";

export const boxes = asyncReadable<Box[]>(
	[],
	async () => {
		return await box.getBoxes();
	},
	{ reloadable: true }
);
