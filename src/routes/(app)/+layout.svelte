<script>
	import { Separator } from "$lib/components/ui/separator";
	import AccountNavigation from "./accountNavigation.svelte";
	import Navigation from "./navigation.svelte";
</script>

<Navigation />
<AccountNavigation account="chase" safeToSpend={40} />
<Separator class="my-4" />

<slot />
