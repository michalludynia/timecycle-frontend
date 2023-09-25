<script lang="ts">
	import { getIntervals } from '$lib/api/getIntervals';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Label, Select } from 'flowbite-svelte';

	const intervals = useQuery('intervals', getIntervals, {
		select: (data) => data.map((interval) => ({ name: interval.name, value: interval.id }))
	});

	export let label = 'Kontekst';
</script>

<Label for="interval-select" class="block mb-2">
	{label}
</Label>
<Select id="interval-select" items={$intervals.data} />
