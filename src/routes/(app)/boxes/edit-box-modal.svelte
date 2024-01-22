<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Separator } from "$lib/components/ui/separator";
	import { convertFromSubunits, convertToSubunits } from "$lib/currencies";
	import { db } from "$lib/db/client";
	import { boxes as boxesSchema } from "$lib/db/schema";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import type { Box } from "$lib/types";
	import { eq } from "drizzle-orm";

	export let boxToEdit: Box | undefined;
	let open: boolean = true;
	let goal = convertFromSubunits(boxToEdit?.goal as number, $currentAccount.currencyDecimals);

	const saveBox = async () => {
		await db
			.update(boxesSchema)
			.set({
				name: boxToEdit?.name,
				goal: convertToSubunits(goal, $currentAccount.currencyDecimals)
			})
			.where(eq(boxesSchema.id, boxToEdit?.id as number));
		await boxes.reload?.();
		closeDialog();
	};

	const fill = async () => {
		await db
			.update(boxesSchema)
			.set({
				balance: boxToEdit?.goal
			})
			.where(eq(boxesSchema.id, boxToEdit?.id as number));
		await boxes.reload?.();
		closeDialog();
	};

	const deleteBox = async () => {
		await db.delete(boxesSchema).where(eq(boxesSchema.id, boxToEdit?.id as number));
		await boxes.reload?.();
		closeDialog();
	};

	const closeDialog = () => {
		boxToEdit = undefined;
		open = false;
	};
</script>

{#if boxToEdit}
	<Dialog.Root
		bind:open
		onOpenChange={(c) => {
			if (!c) {
				boxToEdit = undefined;
			}
		}}
	>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>edit box</Dialog.Title>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid items-center gap-4">
					<Label for="name">name</Label>
					<Input id="name" type="text" bind:value={boxToEdit.name} />
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
				<Button class="w-full" variant="destructive" on:click={deleteBox}>delete</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}
