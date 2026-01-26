import { page } from "$app/state";

export const getHostname = (): string => {
	if (page.url.href.includes("CODE/admin/ab-testing")) {
		return "https://m.code.dev-theguardian.com";
	}
	return "https://www.theguardian.com";
};
