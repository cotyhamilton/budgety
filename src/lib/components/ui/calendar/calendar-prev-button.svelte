<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { ChevronLeft } from "lucide-svelte";

	type $$Props = CalendarPrimitive.PrevButtonProps;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Events = CalendarPrimitive.PrevButtonEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.PrevButton
	on:click
	class={cn(
		buttonVariants({ variant: "outline" }),
		"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
		className
	)}
	{...$$restProps}
	let:builder
>
	<slot {builder}>
		<ChevronLeft class="h-4 w-4" />
	</slot>
</CalendarPrimitive.PrevButton>
