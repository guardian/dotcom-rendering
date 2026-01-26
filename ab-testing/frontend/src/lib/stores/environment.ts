import { page } from "$app/state";

export function getHostname(): string {
	const url = page.url.href;

	console.log("Checking URL:", url);
	console.log("Checking Hostname:", page.url.hostname);

	// Check for CODE environment
	if (
		url.includes("frontend.code.dev-gutools.co.uk") ||
		page.url.hostname.includes("code.dev-gutools.co.uk")
	) {
		return "https://m.code.dev-theguardian.com";
	}

	return "https://www.theguardian.com";
}
