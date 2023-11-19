<script lang="ts">
	import * as Card from "$lib/components/ui/card";
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
				<Card.Description>{box.balance} / {box.goal}</Card.Description>
			</Card.Header>
		</Card.Root>
	{/each}
{/await}
