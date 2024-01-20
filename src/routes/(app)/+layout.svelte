<script>
	import { dev } from "$app/environment";
	import { Button } from "$lib/components/ui/button";
	import * as Drawer from "$lib/components/ui/drawer";
	import { Separator } from "$lib/components/ui/separator";
	import { accounts, currentAccount } from "$lib/stores/account";
	import { Bug } from "lucide-svelte";
	import AccountNavigation from "./account-navigation.svelte";
	import Debugger from "./debugger.svelte";
	import Navigation from "./navigation.svelte";

	export let data;

	// set initial store values;
	$accounts = data.accounts;
	$currentAccount = data.currentAccount || $accounts[0];
</script>

<Navigation />
<AccountNavigation />
<Separator class="my-4" />

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
