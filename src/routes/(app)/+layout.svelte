<script>
	import { goto } from "$app/navigation";
	import { Separator } from "$lib/components/ui/separator";
	import { accounts } from "$lib/stores/account";
	import { onMount } from "svelte";
	import AccountNavigation from "./account-navigation.svelte";
	import Navigation from "./navigation.svelte";

	onMount(async () => {
		// send user to create account if none found
		await accounts.reload?.();

		if ($accounts.length === 0) {
			goto("/create-account");
		}
	});
</script>

{#if $accounts.length}
	<Navigation />
	<AccountNavigation />
	<Separator class="my-4" />
{/if}

<slot />
