import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Start with production URL
export const hostname = writable("https://www.theguardian.com");

// Update on client side only
if (browser) {
	if (window.location.href.includes("CODE/admin")) {
		hostname.set("https://m.code.dev-theguardian.com");
	}
}
