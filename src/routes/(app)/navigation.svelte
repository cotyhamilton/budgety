<script lang="ts">
	import { page } from "$app/stores";

	const routes = ["boxes", "transactions", "accounts", "balances"];
</script>

<nav class="flex items-center justify-between my-6">
	<ul>
		<li><strong>budgety 💰</strong></li>
	</ul>
	<ul class="flex justify-end items-center space-x-4 lg:space-x-6">
		{#each routes as route}
			{#if $page.url.pathname === `/${route}`}
				<li>
					<strong
						><a href="/{route}" class="transition-colors hover:text-primary"> {route} </a></strong
					>
				</li>
			{:else}
				<li>
					<a href="/{route}" class="transition-colors hover:text-primary text-muted-foreground">
						{route}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
