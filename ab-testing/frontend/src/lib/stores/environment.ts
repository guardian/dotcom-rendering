import { writable } from "svelte/store";
import { browser } from "$app/environment";

const createEnvironmentStore = () => {
	const { subscribe, set } = writable("https://www.theguardian.com");

	// Only run in browser, not during SSR
	if (browser) {
		if (
			window.location.href.includes(
				"https://frontend.code.dev-gutools.co.uk/",
			)
		) {
			set("https://m.code.dev-theguardian.com");
		}
	}

	return { subscribe };
};

export const hostname = createEnvironmentStore();
