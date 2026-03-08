<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { currentTrackUrl } from '$lib';

	let widget: any;

	onMount(() => {
		const scScript = document.createElement('script');
		scScript.src = "https://w.soundcloud.com/player/api.js";
		scScript.async = true;
		document.body.appendChild(scScript);

		setTimeout(() => {
			const iframe = document.getElementById('sc-widget') as HTMLIFrameElement;
			if (iframe && (window as any).SC) {
				widget = (window as any).SC.Widget(iframe);
				widget.bind((window as any).SC.Widget.Events.READY, () => console.log('SoundCloud widget listo'));
			}
		}, 500);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar">
	<a href="/">Home</a>
	<a href="/sets">Sets</a>
	<a href="/projects">Projects</a>
	<a href="/contact">Contact</a>
</nav>

<main>
	<slot />
</main>

<footer class="player">
	<iframe
	id="sc-widget"
	title="Reproductor de SoundCloud"
	width="100%"
	height="166"
	scrolling="no"
	frameborder="no"
	allow="autoplay"
	src={`https://w.soundcloud.com/player/?url=${encodeURIComponent($currentTrackUrl)}&auto_play=false&show_comments=false`}>
</iframe>
</footer>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Arial', sans-serif;
	}
	.navbar {
		display: flex;
		background-color: #1b1b1b;
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
		background-color: #f1f1f1;
		min-height: calc(100vh - 68px);
		padding-bottom: 90px;
		color: #1b1b1b;
	}
	footer.player {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 70px;
		background: #111;
		box-shadow: 0 -5px 20px rgba(0,0,0,0.5);
		display: flex;
		align-items: center;
	}
</style>