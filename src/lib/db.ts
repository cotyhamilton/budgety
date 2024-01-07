import initWasm, { type DB } from "@vlcn.io/crsqlite-wasm";
import wasmUrl from "@vlcn.io/crsqlite-wasm/crsqlite.wasm?url";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { migrate } from "./db/migrator";
import * as schema from "./db/schema";

let connection: DB;

export const createDatabase = async () => {
	const url =
		process.env.NODE_ENV === "test" ? "https://esm.sh/@vlcn.io/crsqlite-wasm@0.16.0" : wasmUrl;
	const sqlite = await initWasm(() => url);
	connection = await sqlite.open(":memory:");
	await migrate(db);
};

export const getDatabase = async () => {
	if (!connection) {
		await createDatabase();
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
