<script lang="ts">
	import ValidationMessage from '$lib/components/forms/ValidationMessage.svelte';
	import { Label, Input, Button, Heading } from 'flowbite-svelte';
	import { createForm } from 'felte';
	import * as zod from 'zod';
	import { useMutation } from '@sveltestack/svelte-query';
	import { reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { authorize } from '$lib/api/authActions';
	import { setTokens } from '$lib/stores/tokens.store';

	const schema = zod.object({
		username: zod.string().nonempty(),
		password: zod.string().nonempty()
	});

	const { form } = createForm<zod.infer<typeof schema>>({
		onSubmit: (values) => {
			authorize(values).then((response) => setTokens(response.token, response.refreshToken)); //TODO: use mutatation, handle errors
		},
		extend: [validator({ schema }), reporter]
	});
</script>

<form use:form>
	<div class="px-96 mt-24">
		<Heading tag="h2" class="mb-4">Zaloguj się</Heading>
		<div class="grid grid-rows-3 gap-6">
			<div>
				<Label for="insert-date" class="block">Username</Label>
				<Input id="login" name="username" type="text" required />
				<ValidationMessage forInput="username" />
			</div>
			<div>
				<Label for="insert-date" class="block">Password</Label>
				<Input id="password" name="password" type="text" required />
				<ValidationMessage forInput="password" />
			</div>
			<div>
				<Button type="submit" class="mr-4" color="green">Zaloguj</Button>
			</div>
		</div>
	</div>
</form>
