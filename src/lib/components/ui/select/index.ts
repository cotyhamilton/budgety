import Select from "./select.svelte";

type InputEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLInputElement;
};
export type InputEvents = {
	blur: InputEvent<FocusEvent>;
	change: InputEvent<Event>;
	click: InputEvent<MouseEvent>;
	focus: InputEvent<FocusEvent>;
	keydown: InputEvent<KeyboardEvent>;
	keypress: InputEvent<KeyboardEvent>;
	keyup: InputEvent<KeyboardEvent>;
	mouseover: InputEvent<MouseEvent>;
	mouseenter: InputEvent<MouseEvent>;
	mouseleave: InputEvent<MouseEvent>;
};

export { Select };
