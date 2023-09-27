<script lang="ts">
	import ValidationMessage from '$lib/components/forms/ValidationMessage.svelte';
	import { Label, Input, Button, Heading, Spinner } from 'flowbite-svelte';
	import { createForm } from 'felte';
	import * as zod from 'zod';
	import { reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';

	export let onSubmit: CallableFunction;
	export let isLoading = false;

	const schema = zod.object({
		username: zod.string().nonempty(),
		password: zod.string().nonempty()
	});

	const { form } = createForm<zod.infer<typeof schema>>({
		onSubmit: (values) => {
			onSubmit(values);
		},
		extend: [validator({ schema }), reporter]
	});
</script>

<form use:form>
	<div class="px-96 mt-24">
		<Heading tag="h2" class="mb-4">Zaloguj się</Heading>
		<div class="grid grid-rows-3 gap-6">
			<div>
				<Label for="username" class="block">Login</Label>
				<Input id="username" name="username" type="text" required />
				<ValidationMessage forInput="username" />
			</div>
			<div>
				<Label for="password" class="block">Hasło</Label>
				<Input id="password" name="password" type="text" required />
				<ValidationMessage forInput="password" />
			</div>
			<div>
				<Button type="submit" class="mr-4" color="green">
					{#if isLoading}
						<Spinner class="mr-3" size="4" color="white" />Logowanie
					{:else}
						Zaloguj
					{/if}
				</Button>
			</div>
		</div>
	</div>
</form>
