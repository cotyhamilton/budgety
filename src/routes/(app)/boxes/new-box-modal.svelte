<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Drawer from "$lib/components/ui/drawer";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Switch } from "$lib/components/ui/switch";
	import { convertToSubunits } from "$lib/currencies";
	import { db } from "$lib/db/client";
	import { boxes as schema } from "$lib/db/schema";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";

	export let open: boolean;

	let name: string;
	let goal: number | undefined;
	let fill = true;

	const saveBox = async () => {
		await db
			.insert(schema)
			.values([
				{
					name,
					balance: fill ? convertToSubunits(goal ?? 0, $currentAccount.currencyDecimals) : 0,
					goal: convertToSubunits(goal ?? 0, $currentAccount.currencyDecimals),
					financialAccount: $currentAccount.id
				}
			])
			.returning()
			.get();
		boxes.reload?.();
		open = false;
	};

	// reset form
	$: if (!open) {
		name = "";
		goal = undefined;
		fill = true;
	}
</script>

{#if window.innerWidth < 768}
	<Drawer.Root bind:open>
		<Drawer.Content class="h-[96%]">
			<Drawer.Header>
				<Drawer.Title>add box</Drawer.Title>
			</Drawer.Header>
			<div class="grid gap-4 p-4 overflow-y-scroll">
				<div class="grid items-center gap-4">
					<Label for="name">name</Label>
					<Input id="name" type="text" bind:value={name} />
				</div>
				<div class="grid items-center gap-4">
					<Label for="goal">goal</Label>
					<Input id="goal" type="number" bind:value={goal} />
				</div>
				<div class="grid items-center gap-4">
					<Label for="fill">fill up now</Label>
					<Switch id="fill" bind:checked={fill} />
				</div>
				<Button class="w-full" on:click={saveBox} type="submit">save</Button>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<Dialog.Root bind:open>
		<Dialog.Content class="max-h-[96%]">
			<Dialog.Header>
				<Dialog.Title>add box</Dialog.Title>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid items-center gap-4">
					<Label for="name">name</Label>
					<Input id="name" type="text" bind:value={name} />
				</div>
				<div class="grid items-center gap-4">
					<Label for="goal">goal</Label>
					<Input id="goal" type="number" bind:value={goal} />
				</div>
				<div class="grid items-center gap-4">
					<Label for="fill">fill up now</Label>
					<Switch id="fill" bind:checked={fill} />
				</div>
			</div>
			<Dialog.Footer>
				<Button class="w-full" on:click={saveBox} type="submit">save</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/if}
