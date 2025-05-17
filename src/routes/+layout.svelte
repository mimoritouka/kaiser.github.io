<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="w-full h-full">
	<Header />
	<div class="break-words">
		{@render children()}
	</div>
	<Footer />
</div>
