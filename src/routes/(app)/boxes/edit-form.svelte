<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import { Separator } from "$lib/components/ui/separator";
	import { convertFromSubunits, convertToSubunits } from "$lib/currencies";
	import { db } from "$lib/db/client";
	import { boxes as boxesSchema } from "$lib/db/schema";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import type { Box } from "$lib/types";
	import { cn } from "$lib/utils";
	import { eq } from "drizzle-orm";

	export let boxToEdit: Box;
	export let open: boolean = true;

	let name = boxToEdit.name;
	let goal = convertFromSubunits(boxToEdit.goal, $currentAccount.currencyDecimals);
	let transferDirection: "to" | "from" = "to";
	let transferAmount: number;

	let className: string | null | undefined = undefined;
	export { className as class };

	const saveBox = async () => {
		await db
			.update(boxesSchema)
			.set({
				name: name,
				goal: convertToSubunits(goal, $currentAccount.currencyDecimals)
			})
			.where(eq(boxesSchema.id, boxToEdit.id));
		await boxes.reload?.();
		closeDialog();
	};

	const fill = async () => {
		await db
			.update(boxesSchema)
			.set({
				balance: boxToEdit.goal
			})
			.where(eq(boxesSchema.id, boxToEdit.id));
		await boxes.reload?.();
		closeDialog();
	};

	const transfer = async () => {
		const newBalance = convertToSubunits(transferAmount, $currentAccount.currencyDecimals);
		await db
			.update(boxesSchema)
			.set({
				balance: boxToEdit.balance - (transferDirection === "to" ? -newBalance : newBalance)
			})
			.where(eq(boxesSchema.id, boxToEdit.id));
		await boxes.reload?.();
		closeDialog();
	};

	const deleteBox = async () => {
		await db.delete(boxesSchema).where(eq(boxesSchema.id, boxToEdit.id as number));
		await boxes.reload?.();
		closeDialog();
	};

	const closeDialog = () => {
		open = false;
	};
</script>

<div class={cn("grid gap-4 p-1 overflow-y-scroll", className)}>
	<div class="grid items-center gap-4">
		<Label for="name">name</Label>
		<Input id="name" type="text" bind:value={name} />
	</div>
	<div class="grid items-center gap-4">
		<Label for="goal">goal</Label>
		<Input id="goal" type="number" bind:value={goal} />
	</div>
	<Button class="w-full" on:click={saveBox} type="submit">save</Button>
	<Separator />
	<Label>fill up from safe-to-spend</Label>
	<Button class="w-full" variant="secondary" on:click={fill}>fill up</Button>
	<Separator />
	<Label>transfer money to or from this box</Label>
	<RadioGroup.Root bind:value={transferDirection}>
		<div class="flex items-center space-x-2 m-auto">
			<RadioGroup.Item value="to" id="transfer-to" />
			<Label for="transfer-to">to</Label>
			<RadioGroup.Item value="from" id="transfer-from" />
			<Label for="transfer-from">from</Label>
		</div>
	</RadioGroup.Root>
	<div class="grid items-center gap-4">
		<Label for="transfer-amount">amount</Label>
		<Input id="transfer-amount" type="number" bind:value={transferAmount} />
	</div>
	<Button class="w-full" variant="secondary" on:click={transfer}>transfer</Button>
	<Separator />
	<Button class="w-full" variant="destructive" on:click={deleteBox}>delete</Button>
</div>
