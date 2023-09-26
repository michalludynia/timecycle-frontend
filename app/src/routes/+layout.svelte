<script lang="ts">
	import '../app.postcss';

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { userStore, type UserInterface } from '$lib/stores/user.store';
	import { getUser } from '$lib/api/authActions';
	import Navigation from '$lib/components/Navigation.svelte';
	import LoginPage from '$lib/components/LoginPage.svelte';

	const tryAutoLogin = async () => {
		const userResponse = await getUser();
		userStore.set({ id: userResponse.id, name: userResponse.name, login: userResponse.login });
	};

	if (!$userStore) {
		tryAutoLogin();
	}

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	{#if !$userStore}
		<LoginPage />
	{:else}
		<Navigation />
		<slot />
	{/if}
</QueryClientProvider>
