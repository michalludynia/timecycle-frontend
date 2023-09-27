<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import { authorize, getUser } from '$lib/api/authActions';
	import { setTokens } from '$lib/stores/tokens.store';
	import type { CredentialsRequest } from '$lib/api/authActions';
	import type { AxiosError } from 'axios';
	import { useMutation } from '@sveltestack/svelte-query';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';
	import { fly } from 'svelte/transition';
	import { Toast } from 'flowbite-svelte';
	import { userStore } from '$lib/stores/user.store';

	let errorMessage: string | null = null;
	//todo add animation when autoHide
	const mutation = useMutation((credentials: CredentialsRequest) => authorize(credentials), {
		onSuccess: (data) => {
			setTokens(data.token, data.refreshToken);
			getUser().then((user) => userStore.set(user));
		},
		onError: () => {
			errorMessage = 'Coś poszło nie tak';
			autoHideToast();
		}
	});

	let counter = 3;
	const autoHideToast = () => {
		if (--counter > 0) {
			return setTimeout(autoHideToast, 1000);
		}
		errorMessage = null;
		counter = 3;
	};

	const onSubmit = (values: CredentialsRequest) => {
		$mutation.mutate(values);
	};
</script>

{#if errorMessage}
	<Toast
		color="red"
		position="bottom-right"
		transition={fly}
		params={{ x: 200 }}
		open={null !== errorMessage}
		class="mb-4"
	>
		<svelte:fragment slot="icon">
			<CloseCircleSolid class="w-5 h-5" />
			<span class="sr-only">Error icon</span>
		</svelte:fragment>
		{errorMessage}
	</Toast>
{/if}

<LoginForm {onSubmit} isLoading={$mutation.isLoading || $mutation.isSuccess} />
