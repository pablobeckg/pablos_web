<script lang="ts">
  import { onMount } from 'svelte';
  import favicon from '$lib/assets/favicon.svg';
  import { currentTrackUrl, shouldAutoplay } from '$lib';

  let widget: any;
  let iframeSrc = '';

  // Build iframe src reactively, but safely
  $: iframeSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent($currentTrackUrl)}&auto_play=${$shouldAutoplay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&show_artwork=false&continuous_play=false&color=%231b1b1b&visual=false`;

  onMount(() => {
    // Load SoundCloud API script only once
    if (!(window as any).SC) {
      const scScript = document.createElement('script');
      scScript.src = 'https://w.soundcloud.com/player/api.js';
      scScript.async = true;
      document.body.appendChild(scScript);
    }

    // Initialize widget once SC is loaded
    const initWidget = () => {
      const iframe = document.getElementById('sc-widget') as HTMLIFrameElement;
      if (iframe && (window as any).SC) {
        widget = (window as any).SC.Widget(iframe);
        widget.bind((window as any).SC.Widget.Events.READY, () => {});
      }
    };

    const interval = setInterval(() => {
      if ((window as any).SC) {
        initWidget();
        clearInterval(interval);
      }
    }, 100);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <h1><a href="/">ZITO</a></h1>
  <nav class="navbar">
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
    height="176"
    scrolling="no"
    frameborder="no"
    allow="autoplay; encrypted-media"
    src={iframeSrc}
  ></iframe>
</footer>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #cacaca;
  }

  header {
    justify-self: center;
    clip-path: polygon(1% 5%, 100% 0%, 98% 60%, 1.5% 100%);
    margin: 1rem 0 0;
    display: flex;
    position: fixed;
    width: calc(100% - 2rem);
    height: 4rem;
    z-index: 1000;
    align-items: center;
  }

  header h1 a {
    background-color: white;
    padding: 1rem 2rem;
    color: #1b1b1b;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;
  }

  header h1 a:hover {
    color: #ffcc00;
  }

  .navbar {
    display: flex;
    background-color: #1b1b1b;
    padding-left: 2rem;
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
    padding: 6rem 2rem 2rem;
    color: #1b1b1b;
    min-height: 900px;
  }

  footer.player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
  }

  iframe {
    border-top-right-radius: 20px;
  }
</style>