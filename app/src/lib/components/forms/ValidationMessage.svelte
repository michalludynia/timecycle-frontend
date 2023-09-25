<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';
	import { Helper } from 'flowbite-svelte';
	export let forInput: string;
</script>

<Helper class="mt-2 h-0.5 min-h-full" color="red">
	<ValidationMessage for={forInput} let:messages={message}>
		{#if message}
			<span>Niepoprawna wartość</span>
		{/if}
		<span slot="placeholder" />
	</ValidationMessage>
</Helper>
