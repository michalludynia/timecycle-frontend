<script lang="ts">
	import '../app.postcss';

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { userStore, type UserInterface } from '$lib/stores/user.store';
	import { getUser } from '$lib/api/authActions';
	import Navigation from '$lib/components/Navigation.svelte';
	import LoginPage from '$lib/components/Login.svelte';
	import { tokensAreAvailable } from '$lib/stores/tokens.store';

	const tryAutoLogin = async () => {
		const userResponse = await getUser();
		userStore.set({ id: userResponse.id, name: userResponse.name, login: userResponse.login });
	};

	if (!$userStore && tokensAreAvailable()) {
		tryAutoLogin();
	}

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	{#if null === $userStore}
		<LoginPage />
	{:else}
		<Navigation />
		<slot />
	{/if}
</QueryClientProvider>
