<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { accounts, currentAccountBalances } from "$lib/stores/account";
	import { PlusCircled } from "radix-icons-svelte";
</script>

<svelte:head>
	<title>accounts</title>
</svelte:head>

<div class="space-between flex items-center">
	<h1 class="text-3xl my-5 font-bold">accounts</h1>
	<div class="ml-auto mr-4">
		<Button disabled>
			<PlusCircled class="mr-2 h-4 w-4" />
			add account
		</Button>
	</div>
</div>

{#await accounts.reload?.() then}
	{#each $accounts as financialAccount}
		<Card.Root class="my-2">
			<Card.Header>
				<Card.Title>{financialAccount.name}</Card.Title>
				<Card.Description>{$currentAccountBalances?.actual?.formatted}</Card.Description>
			</Card.Header>
		</Card.Root>
	{/each}
{/await}
