import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Initialize with production URL
const initialValue = browser
	? window.location.href.includes("https://frontend.code.dev-gutools.co.uk/")
		? "https://m.code.dev-theguardian.com"
		: "https://www.theguardian.com"
	: "https://www.theguardian.com";

export const hostname = writable(initialValue);
