<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { onMount } from 'svelte';
  import { currentTrackUrl, shouldAutoplay } from '$lib';

  let widget: any;

  onMount(() => {
    const scScript = document.createElement('script');
    scScript.src = 'https://w.soundcloud.com/player/api.js';
    scScript.async = true;

    document.body.appendChild(scScript);

    setTimeout(() => {
      const iframe = document.getElementById('sc-widget') as HTMLIFrameElement;

      if (iframe && (window as any).SC) {
        widget = (window as any).SC.Widget(iframe);

        widget.bind((window as any).SC.Widget.Events.READY, () => {
          console.log('SoundCloud widget listo');
        });
      }
    }, 500);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <h1>ZITO</h1>

  <nav class="navbar">
    <a href="/">Home</a>
    <a href="/sets">Sets</a>
    <a href="/projects">Projects</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

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
    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent($currentTrackUrl)}&auto_play=${$shouldAutoplay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&show_artwork=false&continuous_play=false`}
  >
  </iframe>
</footer>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Arial', sans-serif;
  }

  header {
    display: flex;
    position: fixed;
    width: 100%;
    height: 3rem;
    z-index: 1000;
    align-items: center;
  }

  header h1 {
    margin: 1rem 2rem;
  }

  .navbar {
    display: flex;
    background-color: #1b1b1b;
    padding: 1rem 2rem;
    gap: 2rem;
    width: 100%;
    height: 100%;
    align-items: center;
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
    padding: 5rem 0rem 0rem 0rem;
    background-color: #f1f1f1;
    height: 100%;
    padding-bottom: 90px;
    color: #1b1b1b;
  }

  footer.player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    background: #111;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
  }
</style>