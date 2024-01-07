import { eq } from "drizzle-orm";
import { db } from "../db";
import { boxes } from "../db/schema";

const createBox = async (name: string, balance: number, goal: number, financialAccount: number) => {
	await db.insert(boxes).values([{ name, balance, goal, financial_account: financialAccount }]);
};

export const getBoxes = async () => {
	const result = await db.select().from(boxes);
	return result;
};

export const getBoxById = async (id: number) => {
	const result = await db.select().from(boxes).where(eq(boxes.id, id));
	return result.length > 0 ? result[0] : undefined;
};

export const box = {
	createBox,
	getBoxes,
	getBoxById
};
