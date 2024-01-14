import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { boxes } from "../db/schema";
import type { BoxCreate } from "../types";

const createBox = async ({ name, balance, goal, financialAccount }: BoxCreate) => {
	return await db
		.insert(boxes)
		.values([{ name, balance, goal, financialAccount }])
		.returning()
		.get();
};

export const getBoxes = async () => {
	return await db.query.boxes.findMany({ with: { tx: true } });
};

export const getBoxById = async (id: number) => {
	return await db.select().from(boxes).where(eq(boxes.id, id)).get();
};

export const box = {
	createBox,
	getBoxes,
	getBoxById
};
