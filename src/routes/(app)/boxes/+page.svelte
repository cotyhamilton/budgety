<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { convertFromSubunits, formatter } from "$lib/currencies";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import NewBoxModal from "./NewBoxModal.svelte";
</script>

<svelte:head>
	<title>boxes</title>
</svelte:head>

<div class="space-between flex items-center">
	<h1 class="text-3xl my-5 font-bold">boxes</h1>
	<div class="ml-auto mr-4">
		<NewBoxModal />
	</div>
</div>

{#await boxes.reload?.() then}
	{#each $boxes as box}
		<Card.Root class="my-2">
			<Card.Header>
				<Card.Title>{box.name}</Card.Title>
				<Card.Description
					>{formatter($currentAccount?.currency_code).format(
						convertFromSubunits(box?.balance, $currentAccount?.currency_decimals)
					)} / {formatter($currentAccount?.currency_code).format(
						convertFromSubunits(box?.goal, $currentAccount?.currency_decimals)
					)}</Card.Description
				>
			</Card.Header>
		</Card.Root>
	{/each}
{/await}
