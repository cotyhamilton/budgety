<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Drawer from "$lib/components/ui/drawer";
	import { Progress } from "$lib/components/ui/progress";
	import type { Box } from "$lib/types";
	import EditForm from "./edit-form.svelte";

	export let boxToEdit: Box;
	export let open: boolean = true;
	export let component: "modal" | "drawer" = "modal";
	const name = boxToEdit.name;
</script>

{#if component === "drawer"}
	<Drawer.Root bind:open>
		<Drawer.Content class="max-h-[96%]">
			<Drawer.Header>
				<Drawer.Title>{name}</Drawer.Title>
				<Progress
					class="mt-3"
					value={(boxToEdit.balance / boxToEdit.goal) * 100 > 2
						? (boxToEdit.balance / boxToEdit.goal) * 100
						: 2}
					max={100}
					subClass={boxToEdit.balance >= boxToEdit.goal ? "bg-green-500" : "bg-yellow-500"}
				/>
			</Drawer.Header>
			<EditForm class="p-4" {boxToEdit} bind:open />
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<Dialog.Root bind:open>
		<Dialog.Content class="overflow-auto max-h-[96%]">
			<Dialog.Header>
				<Dialog.Title>{name}</Dialog.Title>
				<Progress
					class="mt-3"
					value={(boxToEdit.balance / boxToEdit.goal) * 100 > 2
						? (boxToEdit.balance / boxToEdit.goal) * 100
						: 2}
					max={100}
					subClass={boxToEdit.balance >= boxToEdit.goal ? "bg-green-500" : "bg-yellow-500"}
				/>
			</Dialog.Header>
			<EditForm {boxToEdit} bind:open />
		</Dialog.Content>
	</Dialog.Root>
{/if}
