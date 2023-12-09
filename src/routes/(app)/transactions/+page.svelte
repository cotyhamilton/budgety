<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { convertFromSubunits, formatter } from "$lib/currencies";
	import { getDatabase } from "$lib/db";
	import { getBoxById } from "$lib/models/box";
	import { currentAccount } from "$lib/stores/account";
	import { transactions } from "$lib/stores/transaction";
	import type { Box } from "$lib/types";
	import NewTxModal from "./NewTxModal.svelte";

	const getBoxName = async (id: number | Box | null | undefined) => {
		if (typeof id === "number") {
			const box = await getBoxById(await getDatabase(), id);
			return box?.name;
		}
		return "";
	};
</script>

<svelte:head>
	<title>transactions</title>
</svelte:head>

<div class="space-between flex items-center">
	<h1 class="text-3xl my-5 font-bold">transactions</h1>
	<div class="ml-auto mr-4">
		<NewTxModal />
	</div>
</div>

{#await transactions.reload?.() then}
	{#each $transactions as transaction}
		<Card.Root class="my-2">
			<Card.Header>
				<Card.Title
					><div class="flex justify-between">
						<span>{transaction.name}</span><span
							>{formatter($currentAccount?.currency_code).format(
								convertFromSubunits(transaction?.amount, $currentAccount?.currency_decimals)
							)}</span
						>
					</div></Card.Title
				>
				<Card.Description
					><div class="flex justify-between">
						<span>{new Date().toDateString()}</span><span
							>{#await getBoxName(transaction.box) then name}
								{name}
							{/await}</span
						>
					</div></Card.Description
				>
			</Card.Header>
		</Card.Root>
	{/each}
{/await}
