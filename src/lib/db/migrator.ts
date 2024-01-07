import { sql } from "drizzle-orm";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import * as journal from "./migrations/meta/_journal.json";

export interface KitConfig {
	out: string;
	schema: string;
}

export interface MigrationConfig {
	migrationsFolder: string;
	migrationsTable?: string;
}

export interface MigrationMeta {
	sql: string[];
	folderMillis: number;
	hash: string;
	bps: boolean;
}

export interface SqliteRemoteResult<T = unknown> {
	rows?: T[];
}

export type SqliteRemoteDatabase<TSchema extends Record<string, unknown> = Record<string, never>> =
	BaseSQLiteDatabase<"async", SqliteRemoteResult, TSchema>;

export async function hashQuery(query: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(query);

	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function readMigrationFiles(): Promise<MigrationMeta[]> {
	const migrationQueries: MigrationMeta[] = [];

	for (const journalEntry of journal.entries) {
		try {
			const query = (await import(`./migrations/${journalEntry.tag}.sql?raw`)).default as string;

			const result = query.split("--> statement-breakpoint").map((it) => {
				return it;
			});

			migrationQueries.push({
				sql: result,
				bps: journalEntry.breakpoints,
				folderMillis: journalEntry.when,
				hash: await hashQuery(query)
			});
		} catch (e) {
			console.log(e);
			throw new Error(`Failed to import migration ${journalEntry.tag}`);
		}
	}

	return migrationQueries;
}

export type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;

export async function migrate<TSchema extends Record<string, unknown>>(
	db: SqliteRemoteDatabase<TSchema>
) {
	const migrations = await readMigrationFiles();

	const migrationTableCreate = sql`
		CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
			id SERIAL PRIMARY KEY,
			hash text NOT NULL,
			created_at numeric
		)
	`;

	await db.run(migrationTableCreate);

	const dbMigrations = await db.values<[number, string, string]>(
		sql`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`
	);

	const lastDbMigration = dbMigrations[0] ?? undefined;

	for (const migration of migrations) {
		if (!lastDbMigration || Number(lastDbMigration[2])! < migration.folderMillis) {
			for (const stmt of migration.sql) {
				await db.run(sql.raw(stmt));
			}
			await db.run(
				sql`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
			);
		}
	}
	console.log("applied migrations");
}
