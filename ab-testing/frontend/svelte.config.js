import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const outputDir = process.env.AB_TESTING_OUTPUT || "output";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: outputDir,
			assets: outputDir,
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		output: {
			bundleStrategy: "inline",
		},
		embedded: true,
	},
};

export default config;
