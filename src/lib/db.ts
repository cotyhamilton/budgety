import initWasm, { type DB } from "@vlcn.io/crsqlite-wasm";
import wasmUrl from "@vlcn.io/crsqlite-wasm/crsqlite.wasm?url";
import migrations from "./sql/migrations";

let db: DB;

export const applyMigrations = async (db: DB) => {
	for (const migration of migrations) {
		try {
			await db.exec(migration);
		} catch (e) {
			console.log(e, migration);
		}
	}
	console.log("Applied migrations");
};

export const createDatabase = async () => {
	const url =
		process.env.NODE_ENV === "test" ? "https://esm.sh/@vlcn.io/crsqlite-wasm@0.16.0" : wasmUrl;
	const sqlite = await initWasm(() => url);
	db = await sqlite.open(":memory:");
	await applyMigrations(db);
};

export const getDatabase = async () => {
	if (!db) {
		await createDatabase();
	}
	return db;
};
