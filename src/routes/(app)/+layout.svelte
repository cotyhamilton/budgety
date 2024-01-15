<script>
	import { dev } from "$app/environment";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import * as Drawer from "$lib/components/ui/drawer";
	import { Separator } from "$lib/components/ui/separator";
	import { accounts } from "$lib/stores/account";
	import { Bug } from "lucide-svelte";
	import { onMount } from "svelte";
	import AccountNavigation from "./account-navigation.svelte";
	import Debugger from "./debugger.svelte";
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

{#if dev}
	<Drawer.Root>
		<Drawer.Trigger>
			<Button class="fixed bottom-2 mx-auto left-1/2 transform -translate-x-1/2 "
				><Bug class="mr-2 h-4 w-4" />debugger</Button
			>
		</Drawer.Trigger>
		<Drawer.Content class="p-4">
			<Debugger />
		</Drawer.Content>
	</Drawer.Root>
{/if}
