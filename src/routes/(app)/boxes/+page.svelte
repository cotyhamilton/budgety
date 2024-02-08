<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Progress } from "$lib/components/ui/progress";
	import { convertFromSubunits, formatter } from "$lib/currencies";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import type { Box } from "$lib/types";
	import EditBoxModal from "./edit-box-modal.svelte";
	import NewBoxModal from "./new-box-modal.svelte";

	let boxToEdit: Box | undefined;
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

{#if boxToEdit}
	<EditBoxModal bind:boxToEdit />
{/if}

{#await boxes.reload?.() then}
	{#each $boxes as box}
		<Card.Root class="my-2">
			<Card.Header>
				<Card.Title
					>{box.name}
					<Button
						variant="ghost"
						class="mx-5 p-0 border-none border-0 h-5"
						on:click={() => (boxToEdit = box)}>edit</Button
					></Card.Title
				>
				<Card.Description
					>{formatter($currentAccount?.currencyCode).format(
						convertFromSubunits(box?.balance, $currentAccount?.currencyDecimals)
					)} / {formatter($currentAccount?.currencyCode).format(
						convertFromSubunits(box?.goal, $currentAccount?.currencyDecimals)
					)}
					<Progress
						class="mt-3"
						value={(box.balance / box.goal) * 100 > 2 ? (box.balance / box.goal) * 100 : 2}
						max={100}
						subClass={box.balance >= box.goal ? "bg-green-500" : "bg-yellow-500"}
					/>
				</Card.Description>
			</Card.Header>
		</Card.Root>
	{/each}
{/await}
