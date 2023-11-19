<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import { currentAccount } from "$lib/stores/account";
</script>

<div class="flex h-5 items-center space-x-4">
	<h2 class="text-xl font-bold">{$currentAccount?.name}</h2>
	<Separator orientation="vertical" />
	<p>safe-to-spend: $1 billion</p>
</div>
