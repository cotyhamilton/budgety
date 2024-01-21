<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { convertFromSubunits, formatter } from "$lib/currencies";
	import { currentAccount } from "$lib/stores/account";
	import { transactions } from "$lib/stores/transaction";
	import NewTxModal from "./new-tx-modal.svelte";

	const formatDate = (isoString: string) => {
		const [year, month, day] = isoString.split("-");
		return new Date(+year, +month - 1, +day).toDateString();
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
							>{formatter($currentAccount?.currencyCode).format(
								convertFromSubunits(transaction?.amount, $currentAccount?.currencyDecimals)
							)}</span
						>
					</div></Card.Title
				>
				<Card.Description
					><div class="flex justify-between">
						<span>{formatDate(transaction.date)}</span><span
							>{transaction.box?.name || "safe-to-spend"}</span
						>
					</div></Card.Description
				>
			</Card.Header>
		</Card.Root>
	{/each}
{/await}
