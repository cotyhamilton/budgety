<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Select } from "$lib/components/ui/select";
	import { convertToSubunits, currencies } from "$lib/currencies";
	import { db } from "$lib/db/client";
	import { financialAccounts } from "$lib/db/schema";
	import { transaction } from "$lib/models/transaction";
	import { accounts, currentAccount } from "$lib/stores/account";

	let name: string;
	let currencyCode: string;
	let balance: number;

	// save account and redirect to accounts page
	const saveAccount = async () => {
		await db
			.insert(financialAccounts)
			.values([{ name, currencyCode, currencyDecimals: currencies[currencyCode].decimals }])
			.returning()
			.get();
		// update accounts store
		await accounts.reload?.();
		// save new account as current account
		$currentAccount = $accounts[0];
		// create initial transaction
		await transaction.createTransaction({
			name: "starting balance",
			amount: convertToSubunits(balance, $currentAccount.currencyDecimals),
			box: null,
			financialAccount: $currentAccount.id,
			year: `${new Date().getFullYear()}`,
			month: ("0" + (new Date().getMonth() + 1)).slice(-2),
			day: ("0" + new Date().getDate()).slice(-2)
		});
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
			<Select id="currency" placeholder="select a currency" bind:value={currencyCode}>
				{#each Object.entries(currencies) as [key]}
					<option value={key}>{key}</option>
				{/each}
			</Select>
			<Label for="balance">current balance</Label>
			<div class="relative mt-2">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<span class="text-gray-500">{currencies[currencyCode]?.symbol || "?"}</span>
				</div>
				<Input
					class="pl-7"
					disabled={!currencyCode}
					type="number"
					id="balance"
					bind:value={balance}
				/>
			</div>
			<Button disabled={!(name && currencyCode)} on:click={saveAccount}>save</Button>
		</div>
	</div>
</div>
