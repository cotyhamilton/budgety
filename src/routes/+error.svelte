<script lang="ts">
	import { page } from "$app/stores";
</script>

<h1>budgety 💰</h1>

<h2>{$page.error?.message}</h2>
<small>{$page.error?.id}</small>
