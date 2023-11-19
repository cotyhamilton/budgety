import * as RadioGroupComp from "$lib/components/ui/radio-group";
import * as SelectComp from "$lib/components/ui/select";
import type { Writable } from "@square/svelte-store";
import { Form as FormPrimitive, getFormField } from "formsnap";
import Button from "./form-button.svelte";
import Checkbox from "./form-checkbox.svelte";
import Description from "./form-description.svelte";
import Input from "./form-input.svelte";
import Item from "./form-item.svelte";
import Label from "./form-label.svelte";
import NativeSelect from "./form-native-select.svelte";
import RadioGroup from "./form-radio-group.svelte";
import SelectTrigger from "./form-select-trigger.svelte";
import Select from "./form-select.svelte";
import Switch from "./form-switch.svelte";
import Textarea from "./form-textarea.svelte";
import Validation from "./form-validation.svelte";

const Root = FormPrimitive.Root;
const Field = FormPrimitive.Field;
const RadioItem = RadioGroupComp.Item;
const NativeRadio = FormPrimitive.Radio;
const SelectContent = SelectComp.Content;
const SelectLabel = SelectComp.Label;
const SelectGroup = SelectComp.Group;
const SelectItem = SelectComp.Item;
const SelectSeparator = SelectComp.Separator;

export type TextareaGetFormField = Omit<ReturnType<typeof getFormField>, "value"> & {
	value: Writable<string>;
};

export {
	Button,
	Checkbox,
	Description,
	Field,
	//
	Root as Form,
	Button as FormButton,
	Checkbox as FormCheckbox,
	Description as FormDescription,
	Field as FormField,
	Input as FormInput,
	Item as FormItem,
	Label as FormLabel,
	NativeRadio as FormNativeRadio,
	NativeSelect as FormNativeSelect,
	RadioGroup as FormRadioGroup,
	RadioItem as FormRadioItem,
	Select as FormSelect,
	SelectContent as FormSelectContent,
	SelectGroup as FormSelectGroup,
	SelectItem as FormSelectItem,
	SelectLabel as FormSelectLabel,
	SelectSeparator as FormSelectSeparator,
	SelectTrigger as FormSelectTrigger,
	Switch as FormSwitch,
	Textarea as FormTextarea,
	Validation as FormValidation,
	Input,
	Item,
	Label,
	NativeRadio,
	NativeSelect,
	RadioGroup,
	RadioItem,
	Root,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	Switch,
	Textarea,
	Validation
};
