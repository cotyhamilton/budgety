<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Select from "$lib/components/ui/select";
	import { convertToSubunits } from "$lib/currencies";
	import { getDatabase } from "$lib/db";
	import { transaction } from "$lib/models/transaction";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import { transactions } from "$lib/stores/transaction";
	import { PlusCircled } from "radix-icons-svelte";

	let name: string;
	let amount: number;
	let open: boolean;
	let box: number;

	// update box when selected
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleBoxSelect = async (e: any) => {
		box = e.value;
	};

	const saveTransaction = async () => {
		transaction.createTransaction(
			await getDatabase(),
			name,
			convertToSubunits(amount, $currentAccount.currency_decimals),
			box ?? null,
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
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">box</Label>
				<Select.Root onSelectedChange={handleBoxSelect} disabled={$boxes?.length < 1}>
					<Select.Trigger class="col-span-3">
						<Select.Value placeholder={!$boxes?.length ? "create box first" : ""} />
					</Select.Trigger>
					<Select.Content>
						{#each $boxes as box}
							<Select.Item value={box.id}>{box.name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={saveTransaction} type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
