import adapter from '@sveltejs/adapter-cloudflare'; // <--- ESTE DEBE SER EL IMPORT
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter() // Sin parámetros
	}
};

export default config;
