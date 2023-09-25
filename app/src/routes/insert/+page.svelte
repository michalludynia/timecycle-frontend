<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Input,
		Label,
		Select
	} from 'flowbite-svelte';

	import { getIntervals } from '$lib/api/getIntervals';
	import { useQuery } from '@sveltestack/svelte-query';

	const intervals = useQuery('intervals', getIntervals);
	//TODO type it somehow and map to items
	//TODO try one more time if it is possible to move it outside

	let rowsCount = 1;

	function addRow() {
		rowsCount = rowsCount + 1;
	}
</script>

<div class="px-48">
	<div class="mb-4">
		<Label for="insert-date" class="block mb-2">Data</Label>
		<Input id="insert-date" type="date" />
	</div>
	<div class="mb-4">
		<Label for="insert-interval" class="block mb-2">Przedział czasowy</Label>
		<Input id="insert-interval" type="text" />
	</div>
	<div class="mb-4">
		<Label>
			Kontekst
			<Select items={$intervals.data} />
		</Label>
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
