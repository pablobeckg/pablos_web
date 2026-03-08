<script lang="ts">
	import { currentTrackUrl } from '$lib';

	type Track = { img: string; title: string; url: string; };
	let tracks: Track[] = [
		{
			img: '/images/pablo.jpg',
			title: 'Set 1',
			url: 'https://soundcloud.com/callshopradio/10-22-regsam-w-zito'
		},
		{
			img: '/images/pablo2.jpg',
			title: 'Set 2',
			url: 'https://soundcloud.com/zitooo/miscellaneous-music-i-rarely-play-but-i-love'
		}
	];

	// Reproducir track solo al click
	function playTrack(url: string) {
		currentTrackUrl.set(url);
	}
</script>

<h1>Mis Sets</h1>

<div class="gallery">
	{#each tracks as track}
		<button type="button" class="track-button" on:click={() => playTrack(track.url)}>
			<img src={track.img} alt={track.title} />
		</button>
	{/each}
</div>

<style>
	.track-button {
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
	}
	.gallery {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.gallery img {
		width: 200px;
		height: 200px;
		object-fit: cover;
		border: 3px solid transparent;
		transition: transform 0.2s, border-color 0.2s;
	}
	.gallery img:hover {
		transform: scale(1.05);
		border-color: #ffcc00;
	}
</style>