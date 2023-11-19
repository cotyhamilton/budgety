import type { Box } from "$lib/types";
import type { DB } from "@vlcn.io/crsqlite-wasm";

const createBox = async (
	db: DB,
	name: string,
	balance: number,
	goal: number,
	financialAccount: number
) => {
	await db.exec("INSERT INTO boxes (name, balance, goal, financial_account) VALUES (?, ?, ?, ?);", [
		name,
		balance,
		goal,
		financialAccount
	]);
};

export const getBoxes = async (db: DB) => {
	const result = await db.execO<Box>("SELECT * FROM boxes;");
	return result;
};

export const getBoxById = async (db: DB, id: number) => {
	const result = await db.execO<Box>("SELECT * FROM boxes WHERE id = ?;", [id]);
	return result.length > 0 ? result[0] : undefined;
};

export const box = {
	createBox,
	getBoxes,
	getBoxById
};
