<script lang="ts">
	import { clearTokens } from '$lib/stores/tokens.store';
	import { userStore } from '$lib/stores/user.store';
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { afterNavigate, goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	let previousPage: string = '/app';

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const logOut = () => {
		clearTokens();
		userStore.set(null);
		goto('/app', { replaceState: true });
	};

	const cancel = () => {
		popupModal = false;
		goto(previousPage, { replaceState: true });
	};

	let popupModal = true;
</script>

<div transition:fade>
	<Modal bind:open={popupModal} size="xs" autoclose>
		<div class="text-center">
			<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Czy chcesz się wylogować?
			</h3>
			<Button color="red" class="mr-2" on:click={logOut}>Wyloguj</Button>
			<Button color="alternative" on:click={cancel}>Anuluj</Button>
		</div>
	</Modal>
</div>
