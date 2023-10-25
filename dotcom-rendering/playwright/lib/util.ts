import type { BrowserContext, Cookie, Page } from '@playwright/test';

// Playwright does not currently have a useful method for removing a single cookie
// so this workaround is required
const clearCookie = async (
	context: BrowserContext,
	cookieName: string,
): Promise<void> => {
	const cookies = await context.cookies();
	const filteredCookies = cookies.filter(
		(cookie: Cookie) => cookie.name !== cookieName,
	);
	await context.clearCookies();
	await context.addCookies(filteredCookies);
};

const setUrlFragment = (
	urlString: string,
	fragments: Record<string, string>,
): URL => {
	const url = new URL(urlString);

	const newFragments = Object.entries(fragments)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');

	url.hash = (url.hash ? `${url.hash}&` : '') + newFragments;

	return url;
};

const waitForIsland = async (page: Page, island: string): Promise<void> => {
	const islandSelector = `gu-island[name="${island}"]`;
	// create a locator for the island
	const islandLocator = page.locator(islandSelector);
	// check that the island is present on the page
	await islandLocator.isVisible();
	// scroll to it
	await islandLocator.scrollIntoViewIfNeeded();
	// wait for it to be hydrated
	const hyrdatedIslandSelector = `gu-island[name="${island}"][data-island-status="hydrated"]`;
	const hyrdatedIslandLocator = page.locator(hyrdatedIslandSelector);
	await hyrdatedIslandLocator.waitFor({ state: 'visible', timeout: 120000 });
};

export { clearCookie, waitForIsland, setUrlFragment };
