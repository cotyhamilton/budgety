<script lang="ts">
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>boxes</title>
</svelte:head>

<h1 class="text-3xl my-5 font-bold">boxes</h1>
<pre>
{JSON.stringify(data, null, 2)}
</pre>
