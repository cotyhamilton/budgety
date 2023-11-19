<script lang="ts">
	import { goto } from "$app/navigation";
	import * as Form from "$lib/components/ui/form";
</script>

<div
	class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">budgety 💰</h1>
			</div>
			<Form.Button on:click={() => goto("/accounts")}>log in</Form.Button>
		</div>
	</div>
</div>
