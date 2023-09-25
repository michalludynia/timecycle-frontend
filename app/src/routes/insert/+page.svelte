<script lang="ts">
	import IntervalSelect from '$lib/components/forms/IntervalSelect.svelte';
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

	let rowsCount = 1;

	function addRow() {
		rowsCount = rowsCount + 1;
	}
</script>

<form>
	<div class="px-48">
		<div class="grid grid-cols-3 gap-4">
			<div>
				<Label for="insert-date" class="block mb-2">Data</Label>
				<Input id="insert-date" type="date" />
			</div>
			<div>
				<Label for="insert-interval" class="block mb-2">Przedział czasowy</Label>
				<Input id="insert-interval" type="text" />
			</div>
			<div>
				<IntervalSelect />
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
								<Input id={'insert-subcontext-' + i} type="text" />
							</TableBodyCell>
							<TableBodyCell>
								<Input id={'insert-minutes-' + i} type="text" />
							</TableBodyCell>
							<TableBodyCell>
								<Input id={'insert-activity-' + i} type="text" />
							</TableBodyCell>
							<TableBodyCell>
								<Input id={'insert-comment-' + i} type="text" />
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
			<div class="mt-6 flex justify-between">
				<Button class="ml-4" color="light" on:click={addRow}>Dodaj wiersz</Button>
				<Button class="mr-4" color="green">Zapisz</Button>
			</div>
		</div>
	</div>
</form>
