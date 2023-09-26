<script lang="ts">
	import { GET } from '$lib/api/contextsActions';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Label, Select } from 'flowbite-svelte';

	const contexts = useQuery('contexts', GET, {
		select: (data) => data.map((context) => ({ name: context.name, value: context.id }))
	});

	export let label = 'Kontekst';
	export let name: string;
	export let required: boolean = false;
</script>

<Label for="context-select" class="block mb-2">
	{label}
</Label>
<Select
	id="context-select"
	{name}
	items={$contexts.data}
	{required}
	placeholder={'Wybierz ' + label.toLowerCase()}
/>
