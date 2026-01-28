import { page } from "$app/state";

const getStage = (): string => {
	return page.url.href.includes("CODE/admin/ab-testing") ? "CODE" : "PROD";
};

export const getOrigin = (): string => {
	return getStage() === "CODE"
		? "https://m.code.dev-theguardian.com"
		: "https://www.theguardian.com";
};
