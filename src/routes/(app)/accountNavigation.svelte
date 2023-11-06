<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";

	export let account: string;
	export let safeToSpend: number;
</script>

<div class="flex h-5 items-center space-x-4">
	<h2 class="text-xl font-bold">{account}</h2>
	<Separator orientation="vertical" />
	<p>safe-to-spend: ${safeToSpend}.00</p>
</div>
