<script lang="ts" context="module">
	import { z } from "zod";

	export const accountFormSchema = z.object({
		name: z
			.string({
				required_error: "Required.",
			}).trim()
			.min(2, "Name must be at least 2 characters.")
			.max(30, "Name must not be longer than 30 characters"),
		// Hack: https://github.com/colinhacks/zod/issues/2280
		// language: z.enum(languages.map((lang) => lang.value) as [Language, ...Language[]]),
		address: z.string({
			required_error:"Address is required."
		}).trim().max(255,"Address must not be longer than 255 characters."),
		companynumber: z.coerce.number({
			required_error: "Company number is required."
		}).gte(10,"Company number must be at least 2 digits.")
		.lte(100000000000000,"Company number must not be longer than 15 digits."),
		licensenumber: z.string({
			required_error: "License number is required."
		}).trim().min(2,"License number must be at least 2 characters.")
		.max(30,"License number must not be longer than 30 characters."),
		// dob: z
			// .string()
			// .datetime()
			// // we're setting it optional so the user can clear the date and we don't run into
			// // type issues, but we refine it to make sure it's not undefined
			// .optional()
			// .refine((date) => (date === undefined ? false : true), "Please select a valid date."),
	});

	export type AccountFormSchema = typeof accountFormSchema;
	export const deleteCompanySchema = z.object({
		publicId: z.string({
			required_error:"Public ID is required."
		}).trim(),
	});

	export type DeleteCompanySchema = typeof deleteCompanySchema;
</script>

<script lang="ts">
	import CalendarIcon from "svelte-radix/Calendar.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import Check from "svelte-radix/Check.svelte";
	import SuperDebug, { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/ui/form";
	import * as Popover from "$lib/components/ui/popover";
	import * as Command from "$lib/components/ui/command";
	import { Calendar } from "$lib/components/ui/calendar";
	import { Input } from "$lib/components/ui/input";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils/utils";
	import * as m from "$lib/utils/messages";
	import { browser } from "$app/environment";
	import {
		DateFormatter,
		getLocalTimeZone,
		type DateValue,
		parseDate,
	} from "@internationalized/date";
    import Button from "$components/ui/button/button.svelte";
    import * as AlertDialog from "$components/ui/alert-dialog";

	export let data ;
	console.log(data)

	const form = superForm(data.editCompanyForm, {
		validators: zodClient(accountFormSchema),
		multipleSubmits: 'prevent',
	// 	onSubmit: async ({ formData, cancel }) => {
    //   if (formData.get('name') === data.deleteCompanyForm) {
    //     cancel();
    //     // isEditMode = false;
    //     toast.error('No changes were made');
    //   }
    // },
	

		// onResult({ result }) {
		// 	console.log(result)
		// 	if (result.type === "success") {
		// 		toast.success("Success!");
		// 	}
		// }
	});
	const { form: formData, enhance, validate } = form;
	const deleteForm = superForm(data.deleteCompanyForm,{
		validators: zodClient(deleteCompanySchema),
		multipleSubmits: 'prevent',
	})
	const { form: deleteFormData, enhance:deleteAccountFormEnhance } = deleteForm;
	// const df = new DateFormatter("en-US", {
	// 	dateStyle: "long",
	// });

	// let dobValue: DateValue | undefined = $formData.dob ? parseDate($formData.dob) : undefined;
</script>

<form id="edit-company-form" method="POST" action="?/editCompany" class="space-y-8" use:enhance>
	<Form.Field name="name" {form}>
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field name="address" {form}>
		<Form.Control let:attrs>
			<Form.Label>Address</Form.Label>
			<Input {...attrs} bind:value={$formData.address} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field name="companynumber" {form}>
		<Form.Control let:attrs>
			<Form.Label>Company Number</Form.Label>
			<Input readonly {...attrs} bind:value={$formData.companynumber} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field name="licensenumber" {form}>
		<Form.Control let:attrs>
			<Form.Label>License Number</Form.Label>
			<Input readonly {...attrs} bind:value={$formData.licensenumber} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- <Form.Field {form} name="name" class="flex flex-col">
		<Form.Control let:attrs>
			<Form.Label>Date of Birth</Form.Label>
			<Popover.Root>
				<Popover.Trigger
					class={cn(
						buttonVariants({ variant: "outline" }),
						"w-[240px] justify-start text-left font-normal",
						!dobValue && "text-muted-foreground"
					)}
					{...attrs}
				>
					<CalendarIcon class="mr-2 h-4 w-4" />
					{dobValue ? df.format(dobValue.toDate(getLocalTimeZone())) : "Pick a date"}
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" align="start">
					<Calendar
						bind:value={dobValue}
						isDateDisabled={(currDate) => {
							const currDateObj = currDate.toDate(getLocalTimeZone());
							const today = new Date();
							today.setHours(0, 0, 0, 0);

							if (currDateObj > today || currDate.year < 1900) return true;

							return false;
						}}
						onValueChange={(value) => {
							if (value === undefined) {
								$formData.dob = undefined;
								validate("dob");
								return;
							}
							$formData.dob = value.toDate(getLocalTimeZone()).toISOString();
							validate("dob");
						}}
					/>
				</Popover.Content>
				<input hidden bind:value={$formData.dob} name={attrs.name} />
			</Popover.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field> -->

	<!-- <Form.Field {form} name="language" class="flex flex-col">
		<Popover.Root>
			<Form.Control let:attrs>
				<Form.Label>Language</Form.Label>
				<Popover.Trigger
					role="combobox"
					class={cn(
						buttonVariants({ variant: "outline" }),
						"w-[200px] justify-between",
						!$formData.language && "text-muted-foreground"
					)}
					{...attrs}
				>
					{languages.find((lang) => lang.value === $formData.language)?.label ||
						"Select a language"}
					<CaretSort class="ml-2 size-4 shrink-0 opacity-50" />
				</Popover.Trigger>
				<input hidden value={$formData.language} name={attrs.name} />
			</Form.Control>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search language..." />
					<Command.Empty>No language found.</Command.Empty>
					<Command.List>
						{#each languages as language}
							<Command.Item
								{...form}
								value={language.label}
								onSelect={() => {
									$formData.language = language.value;
									validate("language");
								}}
							>
								<Check
									class={cn(
										"mr-2 size-4",
										language.value === $formData.language
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{language.label}
							</Command.Item>
						{/each}
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</Form.Field> -->

	<Form.Button>Edit Company</Form.Button>
</form>
<AlertDialog.Root>
	<AlertDialog.Trigger><Button variant="destructive">Delete Company</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
	  <AlertDialog.Header>
		<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
		<AlertDialog.Description>
		  This action cannot be undone. This will permanently delete your account
		  and remove your data from our servers.
		</AlertDialog.Description>
	  </AlertDialog.Header>
	  <AlertDialog.Footer>
		<form id="delete-company-form" action="?/deleteCompany" method="POST" use:deleteAccountFormEnhance >
			<Form.Field form={deleteForm} name="publicId" class="space-y-0">
				<Form.Control let:attrs>
				  <Form.Label hidden>Account ID</Form.Label>
				  <Input type="hidden" bind:value={$deleteFormData.publicId} {...attrs} />
				  <Form.FieldErrors />
				</Form.Control>
			  </Form.Field>
		<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
		<AlertDialog.Action on:click={() => deleteForm.submit()}>Continue</AlertDialog.Action>
	</form>
	  </AlertDialog.Footer>
	</AlertDialog.Content>
  </AlertDialog.Root>

<!-- {#if browser}
	<SuperDebug data={$formData} />
{/if} -->