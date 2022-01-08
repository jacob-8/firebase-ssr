import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			// None of the following configurations or combos of them (that I have tried) seem to work on both local dev and Vercel
			ssr: {
				// external: ['firebase'],
				noExternal: ['sveltefirets'], 
				// noExternal: ['sveltefirets', 'firebase'],
			},
			optimizeDeps: {
				// exclude: ['firebase'],
				// include: ['sveltefirets'],
				// include: ['sveltefirets', 'firebase'],
			},
		}
	}
};

export default config;
