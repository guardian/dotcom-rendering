import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		"process.env.AB_TESTING_ENV": JSON.stringify(
			process.env.AB_TESTING_ENV || "production",
		),
	},
});
