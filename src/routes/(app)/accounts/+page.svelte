<script lang="ts">
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>accounts</title>
</svelte:head>

<h1>accounts</h1>
<pre>
{JSON.stringify(data, null, 2)}
</pre>
