<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import { currentAccount, currentAccountBalances } from "$lib/stores/account";
</script>

{#if $currentAccount}
	<div class="flex h-5 items-center space-x-4">
		<h2 class="text-xl font-bold">{$currentAccount?.name}</h2>
		<Separator orientation="vertical" />
		<p>
			safe-to-spend: {$currentAccountBalances?.safe?.formatted}
		</p>
	</div>
{/if}
