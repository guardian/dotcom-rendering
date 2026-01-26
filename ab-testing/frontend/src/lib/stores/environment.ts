import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Start with production URL
export const hostname = writable("https://www.theguardian.com");

// Update on client side only
if (browser) {
	console.log("Browser detected, checking URL:", window.location.href);
	if (
		window.location.href.includes("frontend.code.dev-gutools.co.uk") ||
		window.location.href.includes("CODE/admin")
	) {
		console.log("CODE environment detected, setting CODE hostname");
		hostname.set("https://m.code.dev-theguardian.com");
	} else {
		console.log("Production environment, keeping production hostname");
	}
}
