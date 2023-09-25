<script lang="ts">
	import ContextSelect from '$lib/components/forms/ContextSelect.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Input,
		Label
	} from 'flowbite-svelte';
	import { createForm } from 'felte';
	import { POST } from '$lib/api/contexts';
	import * as zod from 'zod';
	import { validator } from '@felte/validator-zod';
	import { reporter } from '@felte/reporter-svelte';
	import ValidationMessage from '$lib/components/forms/ValidationMessage.svelte';

	let rowsCount = 1;

	function addRow() {
		rowsCount = rowsCount + 1;
	}

	const schema = zod.object({
		date: zod.coerce.date(),
		interval: zod.string().nonempty(),
		context: zod.string().nonempty(),
		records: zod
			.array(
				zod.object({
					subcontext: zod.string().nonempty(),
					minutes: zod.number().min(1),
					activity: zod.string().nonempty(),
					comment: zod.string().optional()
				})
			)
			.nonempty()
	});
	const { form } = createForm<zod.infer<typeof schema>>({
		onSubmit: (values) => {
			console.log(values);
			POST(values);
		},
		extend: [validator({ schema }), reporter]
	});
</script>

<form use:form>
	<div class="px-48">
		<div class="grid grid-cols-3 gap-4">
			<div>
				<Label for="insert-date" class="block mb-2">Data</Label>
				<Input id="insert-date" name="date" type="date" required />
				<ValidationMessage forInput="date" />
			</div>
			<div>
				<Label for="insert-interval" class="block mb-2">Przedział czasowy</Label>
				<Input id="insert-interval" name="interval" type="text" required />
				<ValidationMessage forInput="interval" />
			</div>
			<div>
				<ContextSelect name="context" required={true} />
				<ValidationMessage forInput="context" />
			</div>
		</div>

		<div class="mt-20">
			<Table noborder={true}>
				<TableHead>
					<TableHeadCell>Element kontekstu</TableHeadCell>
					<TableHeadCell>Minuty</TableHeadCell>
					<TableHeadCell>Czynności</TableHeadCell>
					<TableHeadCell>Komentarz</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each { length: rowsCount } as _, i}
						<TableBodyRow>
							<TableBodyCell>
								<Input
									id={'records.' + i + '.subcontext'}
									name={'records.' + i + '.subcontext'}
									type="text"
									required
								/>
								<ValidationMessage forInput={'records.' + i + '.subcontext'} />
							</TableBodyCell>
							<TableBodyCell>
								<Input
									id={'records.' + i + '.minutes'}
									name={'records.' + i + '.minutes'}
									type="number"
									required
								/>
								<ValidationMessage forInput={'records.' + i + '.minutes'} />
							</TableBodyCell>
							<TableBodyCell>
								<Input
									id={'records.' + i + '.activity'}
									name={'records.' + i + '.activity'}
									type="text"
									required
								/>
								<ValidationMessage forInput={'records.' + i + '.activity'} />
							</TableBodyCell>
							<TableBodyCell>
								<Input
									id={'records.' + i + '.comment'}
									name={'records.' + i + '.comment'}
									type="text"
								/>
								<ValidationMessage forInput={'records.' + i + '.comment'} />
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
			<div class="mt-6 flex justify-between">
				<Button class="ml-4" color="light" on:click={addRow}>Dodaj wiersz</Button>
				<Button type="submit" class="mr-4" color="green">Zapisz</Button>
			</div>
		</div>
	</div>
</form>
