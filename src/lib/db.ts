import initWasm, { type DB } from "@vlcn.io/crsqlite-wasm";
import wasmUrl from "@vlcn.io/crsqlite-wasm/crsqlite.wasm?url";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { migrate } from "./db/migrator";
import * as schema from "./db/schema";

let connection: DB;
let creating = false;

export const createDatabase = async () => {
	creating = true;
	const url =
		process.env.NODE_ENV === "test" ? "https://esm.sh/@vlcn.io/crsqlite-wasm@0.16.0" : wasmUrl;
	const sqlite = await initWasm(() => url);
	connection = await sqlite.open(":memory:");
	await migrate(db);
	creating = false;
};

export const getDatabase = async () => {
	if (!connection && !creating) {
		await createDatabase();
	} else if (!connection && creating) {
		while (creating) {
			await new Promise((resolve) => setTimeout(resolve, 10));
		}
	}
	return connection;
};

export const db = drizzle(
	async (sql, params) => {
		const sqlite = await getDatabase();
		try {
			const rows = await sqlite.execA(sql, params);
			return { rows: rows };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			console.error("Error from sqlite proxy: ", e.response.data);
			return { rows: [] };
		}
	},
	{ schema }
);
