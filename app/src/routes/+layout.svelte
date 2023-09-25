<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.postcss';

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<Navigation />
	<slot />
</QueryClientProvider>
