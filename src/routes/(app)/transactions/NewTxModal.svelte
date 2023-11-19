<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { getDatabase } from "$lib/db";
	import { transaction } from "$lib/models/transaction";
	import { currentAccount } from "$lib/stores/account";
	import { transactions } from "$lib/stores/transaction";
	import { PlusCircled } from "radix-icons-svelte";

	let name: string;
	let amount: number;
	let open: boolean;

	const saveTransaction = async () => {
		transaction.createTransaction(
			await getDatabase(),
			name,
			amount,
			1,
			$currentAccount.id,
			2023,
			11,
			18
		);
		transactions.reload?.();
		name = "";
		amount = 0;
		open = false;
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		><Button>
			<PlusCircled class="mr-2 h-4 w-4" />
			add transaction
		</Button></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>add transaction</Dialog.Title>
			<Dialog.Description>transaction details</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">name</Label>
				<Input id="name" type="text" class="col-span-3" bind:value={name} />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">amount</Label>
				<Input id="amount" type="number" class="col-span-3" bind:value={amount} />
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={saveTransaction} type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
