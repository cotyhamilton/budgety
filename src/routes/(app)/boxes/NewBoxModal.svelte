<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { convertToSubunits } from "$lib/currencies";
	import { box } from "$lib/models/box";
	import { currentAccount } from "$lib/stores/account";
	import { boxes } from "$lib/stores/boxes";
	import { PlusCircled } from "radix-icons-svelte";

	let name: string;
	let goal: number;
	let open: boolean;

	const saveBox = async () => {
		box.createBox({
			name,
			balance: 0,
			goal: convertToSubunits(goal, $currentAccount.currencyDecimals),
			financialAccount: $currentAccount.id
		});
		boxes.reload?.();
		name = "";
		goal = 0;
		open = false;
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		><Button>
			<PlusCircled class="mr-2 h-4 w-4" />
			add box
		</Button></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>add box</Dialog.Title>
			<Dialog.Description>box details</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">name</Label>
				<Input id="name" type="text" class="col-span-3" bind:value={name} />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">goal</Label>
				<Input id="amount" type="number" class="col-span-3" bind:value={goal} />
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={saveBox} type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
