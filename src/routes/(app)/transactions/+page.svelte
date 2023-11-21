<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { convertFromSubunits, formatter } from "$lib/currencies";
	import { currentAccount } from "$lib/stores/account";
	import { transactions } from "$lib/stores/transaction";
	import NewTxModal from "./NewTxModal.svelte";
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
				<Card.Title>{transaction.name}</Card.Title>
				<Card.Description
					>{formatter($currentAccount?.currency_code).format(
						convertFromSubunits(transaction?.amount, $currentAccount?.currency_decimals)
					)}</Card.Description
				>
			</Card.Header>
		</Card.Root>
	{/each}
{/await}
