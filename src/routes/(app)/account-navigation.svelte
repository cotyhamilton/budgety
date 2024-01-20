<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { currentAccount, currentAccountBalances } from "$lib/stores/account";
</script>

<div class="flex h-5 items-center space-x-4">
	{#if $currentAccount && $currentAccountBalances}
		<h2 class="text-xl font-bold">{$currentAccount?.name}</h2>
		<Separator orientation="vertical" />
		<div>
			<p>safe-to-spend: {$currentAccountBalances?.safe?.formatted}</p>
		</div>
	{:else}
		<Skeleton class="h-6 w-[250px]" />
	{/if}
</div>
