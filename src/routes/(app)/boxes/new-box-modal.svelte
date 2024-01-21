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
		</div>
		<Dialog.Footer>
			<Button class="w-full" on:click={saveBox} type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
