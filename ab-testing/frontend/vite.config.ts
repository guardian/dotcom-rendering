import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({
				pages: "output",
				assets: "output",
				fallback: undefined,
				precompress: false,
				strict: true,
			}),
			output: {
				bundleStrategy: "inline",
			},
			embedded: true,
		}),
	],
});
