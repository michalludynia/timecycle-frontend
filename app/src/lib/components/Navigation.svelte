<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/stores';

	const tabs = [
		{ path: '/app/insert', label: 'Wprowadź' },
		{ path: '/app/logout', label: 'Wyloguj' }
	];

	$: activeUrl = $page.url.pathname;
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Timecycle</span
		>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {activeUrl} {hidden}>
		{#each tabs as tab}
			<NavLi href={tab.path}>{tab.label}</NavLi>
		{/each}
	</NavUl>
</Navbar>
