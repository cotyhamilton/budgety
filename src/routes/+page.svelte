<script lang="ts">
	import type { PageData } from "./$types";
	import { formSchema } from "./schema";
	import { AlertCircle, Loader2 } from "lucide-svelte";
	import * as Form from "$lib/components/ui/form";
	import * as Alert from "$lib/components/ui/alert";
	import { superForm } from "sveltekit-superforms/client";

	export let data: PageData;

	const { form } = data;
	const { errors } = superForm(form, { id: "errors" });

	let isLoading = false;

	$: {
		if ($errors._errors) {
			isLoading = false;
		}
	}
</script>

<div
	class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">budgety 💰</h1>
			</div>
			<Form.Root method="POST" {form} schema={formSchema} let:config class="grid gap-6">
				<Form.Field {config} name="email">
					<Form.Item>
						<Form.Label for="email">email</Form.Label>
						<Form.Input id="email" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="password">
					<Form.Item>
						<Form.Label for="password">password</Form.Label>
						<Form.Input id="password" type="password" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Button on:click={() => (isLoading = true)}>
					{#if isLoading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					log in
				</Form.Button>
			</Form.Root>
		</div>
	</div>
	{#if $errors._errors?.length}
		<Alert.Root variant="destructive" class="absolute inset-x-0 bottom-6">
			<AlertCircle class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>
				{#each $errors._errors as error}
					<p>{error}</p>
				{/each}
			</Alert.Description>
		</Alert.Root>
	{/if}
</div>
