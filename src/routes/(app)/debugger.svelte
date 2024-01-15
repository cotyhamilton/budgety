<script lang="ts">
	import { getDatabase } from "$lib/db/client";
	import type { DB } from "@vlcn.io/crsqlite-wasm";
	import { onMount } from "svelte";

	let tables: string[];
	let active: string;

	let db: DB;

	onMount(async () => {
		db = await getDatabase();
	});

	const getTables = async () => {
		tables = (
			await db.execO<{ name: string }>("SELECT name FROM sqlite_master WHERE type='table';")
		).map((table) => table.name);
		active = tables[0];
	};

	const getTableInfo = async (name: string) => {
		return await db.execO<{ name: string; type: string }>(`PRAGMA table_info(${name});`);
	};

	const selectAllFromTable = async (name: string) => {
		return await db.execA(`Select * FROM ${name}`);
	};

	const setActive = (name: string) => {
		active = name;
	};
</script>

<strong><p>tables</p></strong>
<hr />
<div class="grid">
	{#if db}
		<div class="box">
			{#await getTables() then}
				{#each tables as table}
					{#if table === active}
						<strong><p>{table}</p></strong>
					{:else}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<p on:click={() => setActive(table)}>{table}</p>
					{/if}
				{/each}
			{/await}
		</div>
		<div class="box">
			{#if active}
				<table rules="groups">
					<thead>
						{#await getTableInfo(active) then columns}
							<tr>
								{#each columns as column}
									<th>{column.name}</th>
								{/each}
							</tr>
						{/await}
					</thead>
					<tbody>
						{#await selectAllFromTable(active) then rows}
							{#each rows as row}
								<tr>
									{#each row as column}
										<td>{column}</td>
									{/each}
								</tr>
							{/each}
						{/await}
					</tbody>
				</table>
			{/if}
		</div>
		<div class="box">
			<strong><p>columns</p></strong>
			{#await getTableInfo(active) then columns}
				{#each columns as column}
					<p>{column.name} ({column.type})</p>
				{/each}
			{/await}
		</div>
	{/if}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 4fr 2fr;
	}
	.box {
		border: 1px solid black;
		overflow: scroll;
		padding: 1rem;
	}
	table {
		border: 1px solid black;
	}
	th,
	td {
		padding: 6px 12px;
	}
</style>
