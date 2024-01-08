import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { boxes } from "../db/schema";

const createBox = async (name: string, balance: number, goal: number, financialAccount: number) => {
	await db.insert(boxes).values([{ name, balance, goal, financialAccount }]);
};

export const getBoxes = async () => {
	return await db.select().from(boxes);
};

export const getBoxById = async (id: number) => {
	return await db.select().from(boxes).where(eq(boxes.id, id)).get();
};

export const box = {
	createBox,
	getBoxes,
	getBoxById
};
