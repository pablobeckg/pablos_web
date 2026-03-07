<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Menu superior -->
<nav class="navbar">
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>

<main>
	<slot />
</main>

<style>
	/* Estilos globales del layout */
	body {
		margin: 0;
		font-family: 'Arial', sans-serif;
	}

	.navbar {
		display: flex;
		background-color: #1a73e8;
		padding: 1rem 2rem;
		gap: 1rem;
	}

	.navbar a {
		color: white;
		text-decoration: none;
		font-weight: bold;
		transition: color 0.2s;
	}

	.navbar a:hover {
		color: #ffcc00;
	}

	main {
		padding: 2rem;
		background-color: #f0f0f0;
		min-height: calc(100vh - 68px); /* ajusta según altura del nav */
	}
</style>