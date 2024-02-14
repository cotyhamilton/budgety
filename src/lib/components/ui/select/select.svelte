<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLSelectAttributes } from "svelte/elements";
	import type { InputEvents } from ".";

	type $$Props = HTMLSelectAttributes;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Events = InputEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<select
	class={cn(
		"block appearance-none h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	{...$$restProps}
>
	<slot />
</select>

<style>
	select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(136, 145, 164)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-position: center right 0.75rem;
		background-size: 1rem auto;
		background-repeat: no-repeat;
	}
</style>
