import initWasm, { type DB } from "@vlcn.io/crsqlite-wasm";
import wasmUrl from "@vlcn.io/crsqlite-wasm/crsqlite.wasm?url";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { migrate } from "./migrator";
import * as schema from "./schema";

let connection: DB;
let creating = false;

export const createDatabase = async () => {
	creating = true;
	const url =
		process.env.NODE_ENV === "test" ? "https://esm.sh/@vlcn.io/crsqlite-wasm@0.16.0" : wasmUrl;
	const sqlite = await initWasm(() => url);
	connection = await sqlite.open("test.db");

	try {
		await migrate(db);
		console.log("Applied migrations");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error("Error during running migrations: " + e.message);
	}

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
	async (sql, params, method) => {
		const sqlite = await getDatabase();
		const stmt = await sqlite.prepare(sql);
		try {
			let rows = [];
			switch (method) {
				case "get":
					rows = await stmt.bind(params).raw(true).get(null);
					break;
				case "run":
					await stmt.bind(params).raw(true).run(null);
					break;
				case "values":
				case "all":
				default:
					rows = await stmt.bind(params).raw(true).all(null);
					break;
			}
			stmt.finalize(null);
			return { rows: rows };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			console.error("Error from sqlite proxy: ", e.message);
			stmt.finalize(null);
			return { rows: [] };
		}
	},
	{ schema }
);
