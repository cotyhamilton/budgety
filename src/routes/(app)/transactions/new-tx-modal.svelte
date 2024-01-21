<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { DatePicker } from "$lib/components/ui/date-picker";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Select } from "$lib/components/ui/select";
	import { convertToSubunits } from "$lib/currencies";
	import { db } from "$lib/db/client";
	import { boxes as boxesSchema, transactions as transactionsSchema } from "$lib/db/schema";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import { transactions } from "$lib/stores/transaction";
	import { type DateValue } from "@internationalized/date";
	import { eq, sql } from "drizzle-orm";
	import { PlusCircled } from "radix-icons-svelte";

	let name: string;
	let amount: number | undefined;
	let open: boolean;
	let box: number | null;
	let type: "credit" | "debit" = "debit";
	let merchant: string;
	let date: DateValue | undefined;

	const saveTransaction = async () => {
		if (box) {
			await db.transaction(async (tx) => {
				await tx
					.update(boxesSchema)
					.set({
						balance: sql`${boxesSchema.balance} + ${handleSign(convertToSubunits(amount ?? 0, $currentAccount.currencyDecimals))}`
					})
					.where(eq(boxesSchema.id, box as number));
				return await tx
					.insert(transactionsSchema)
					.values({
						name,
						merchant,
						amount: handleSign(convertToSubunits(amount ?? 0, $currentAccount.currencyDecimals)),
						box,
						financialAccount: $currentAccount.id,
						date: date?.toString()
					})
					.returning()
					.get();
			});
		} else {
			await db.insert(transactionsSchema).values({
				name,
				merchant,
				amount: handleSign(convertToSubunits(amount ?? 0, $currentAccount.currencyDecimals)),
				box: null,
				financialAccount: $currentAccount.id,
				date: date?.toString()
			});
		}
		transactions.reload?.();
		open = false;
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const resetForm = async (_toggle?: boolean) => {
		name = "";
		merchant = "";
		amount = undefined;
		type = "debit";
		box = null;
		date = undefined;
	};

	const handleSign = (value: number) => {
		if (value === 0) {
			return value;
		}
		return type === "credit" ? Math.abs(value) : -Math.abs(value);
	};

	$: resetForm(open);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		><Button>
			<PlusCircled class="mr-2 h-4 w-4" />
			add transaction
		</Button></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[800px] max-h-[80vh] overflow-y-scroll overflow-x-hidden">
		<Dialog.Header>
			<Dialog.Title>add transaction</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid items-center gap-4">
				<Label for="name">name</Label>
				<Input id="name" type="text" bind:value={name} />
			</div>
			<div class="grid items-center gap-4">
				<Label for="merchant">merchant (optional)</Label>
				<Input id="merchant" type="text" bind:value={merchant} />
			</div>
			<div class="grid items-center gap-4">
				<Label for="type">type</Label>
				<Select
					id="type"
					bind:value={type}
					on:change={() => {
						box = type === "credit" ? null : box;
					}}
				>
					<option value="debit">debit</option>
					<option value="credit">credit</option>
				</Select>
			</div>

			{#if /Mobi|Android/i.test(navigator.userAgent)}
				<div class="grid items-center gap-4">
					<Label for="date">date</Label>
					<input type="date" />
				</div>
			{:else}
				<Label for="date">date</Label>
				<DatePicker bind:value={date} />
			{/if}

			<div class="grid items-center gap-4">
				<Label for="amount">amount</Label>
				<Input id="amount" type="number" bind:value={amount} />
			</div>
			<div class="grid items-center gap-4">
				<Label for="box">from</Label>
				<Select id="box" disabled={type === "credit" || $boxes?.length < 1} bind:value={box}>
					<option value={null}>safe-to-spend</option>
					{#each $boxes as box}
						<option value={box.id}>{box.name}</option>
					{/each}
				</Select>
			</div>
		</div>
		<Dialog.Footer>
			<Button class="w-full" on:click={saveTransaction} type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
