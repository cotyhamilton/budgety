<script lang="ts">
	import { createDatabase } from "$lib/db/client";
	import { onMount } from "svelte";
	import "../app.postcss";

	onMount(() => {
		createDatabase();
	});
</script>

<div class="container">
	<slot />
</div>
