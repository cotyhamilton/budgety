<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Progress } from "$lib/components/ui/progress";
	import { convertFromSubunits, formatter } from "$lib/currencies";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import type { Box } from "$lib/types";
	import { PlusCircled } from "radix-icons-svelte";
	import EditBoxModal from "./edit-box-modal.svelte";
	import NewBoxModal from "./new-box-modal.svelte";

	let boxToEdit: Box | undefined;
	let openEditModal = false;
	let openNewModal = false;

	$: if (!openEditModal) {
		boxToEdit = undefined;
	}
</script>

<svelte:head>
	<title>boxes</title>
</svelte:head>

<div class="space-between flex items-center">
	<h1 class="text-3xl my-5 font-bold">boxes</h1>
	<div class="ml-auto mr-4">
		<Button on:click={() => (openNewModal = true)}>
			<PlusCircled class="mr-2 h-4 w-4" />
			add box
		</Button>
	</div>
</div>

{#if openNewModal}
	<NewBoxModal bind:open={openNewModal} />
{/if}

{#if boxToEdit && openEditModal}
	<EditBoxModal
		bind:boxToEdit
		bind:open={openEditModal}
		component={window.innerWidth < 768 ? "drawer" : "modal"}
	/>
{/if}

{#await boxes.reload?.() then}
	{#each $boxes as box}
		<button
			class="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-md my-2"
			tabindex={0}
			on:click={() => {
				boxToEdit = { ...box };
				openEditModal = true;
			}}
		>
			<Card.Root>
				<Card.Header>
					<Card.Title>{box.name}</Card.Title>
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
		</button>
	{/each}
{/await}
