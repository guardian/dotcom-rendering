import { readable } from "svelte/store";
import { browser } from "$app/environment";

export const hostname = readable("https://www.theguardian.com", (set) => {
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
});
