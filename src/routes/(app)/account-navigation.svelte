<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import { convertFromSubunits, formatter } from "$lib/currencies";
	import { currentAccount } from "$lib/stores/account";
</script>

{#if $currentAccount}
	<div class="flex h-5 items-center space-x-4">
		<h2 class="text-xl font-bold">{$currentAccount?.name}</h2>
		<Separator orientation="vertical" />
		<p>
			safe-to-spend: {formatter($currentAccount?.currency_code).format(
				convertFromSubunits($currentAccount?.balance, $currentAccount?.currency_decimals)
			)}
		</p>
	</div>
{/if}
