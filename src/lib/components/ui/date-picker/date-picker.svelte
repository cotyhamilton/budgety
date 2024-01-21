<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Calendar } from "$lib/components/ui/calendar";
	import * as Popover from "$lib/components/ui/popover";
	import { cn } from "$lib/utils";
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		type DateValue
	} from "@internationalized/date";
	import { Calendar as CalendarIcon } from "lucide-svelte";

	const df = new DateFormatter("en-US", {
		dateStyle: "long"
	});

	export let value: DateValue = new CalendarDate(
		new Date().getFullYear(),
		new Date().getMonth() + 1,
		new Date().getDate()
	);
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{df.format(value.toDate(getLocalTimeZone()))}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value initialFocus />
	</Popover.Content>
</Popover.Root>
