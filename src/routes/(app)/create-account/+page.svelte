<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Select from "$lib/components/ui/select";
	import { currencies } from "$lib/currencies";
	import { getDatabase } from "$lib/db";
	import { financialAccount } from "$lib/models/financialAccount";
	import { accounts, currentAccount } from "$lib/stores/account";

	let name: string;
	let currencyCode: string;

	// update currency code when selected
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSelect = async (e: any) => {
		currencyCode = e.value;
	};

	// save account and redirect to accounts page
	const saveAccount = async () => {
		await financialAccount.createFinancialAccount(
			await getDatabase(),
			name,
			currencyCode,
			currencies[currencyCode].decimals
		);
		// update accounts store
		await accounts.reload?.();
		// save new account as current account
		$currentAccount = $accounts[0];
		goto("/accounts");
	};
</script>

<svelte:head>
	<title>create account</title>
</svelte:head>

<div
	class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">financial account info</h1>
			</div>
			<Label for="account-name">name</Label>
			<Input type="text" id="account-name" placeholder="capital one" bind:value={name} />
			<Label for="currency">currency</Label>
			<Select.Root onSelectedChange={handleSelect}>
				<Select.Trigger>
					<Select.Value placeholder="select a currency" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>currency</Select.Label>
						{#each Object.entries(currencies) as [key]}
							<Select.Item value={key}>{key}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="currency-code" bind:value={currencyCode} />
			</Select.Root>
			<Button disabled={!(name && currencyCode)} on:click={saveAccount}>save</Button>
		</div>
	</div>
</div>
