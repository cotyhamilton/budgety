<script lang="ts">
	import { getDatabase } from "$lib/db";
	import { onMount } from "svelte";
	import "../app.postcss";

	onMount(async () => {
		await getDatabase();
	});
</script>

<div class="container">
	<slot />
</div>
