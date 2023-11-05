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

const waitForIsland = async (
	page: Page,
	island: string,
	status: 'rendered' | 'hydrated' = 'rendered',
	nth = 0,
): Promise<void> => {
	const islandSelector = `gu-island[name="${island}"]`;
	// create a locator for the island
	const islandLocator = page.locator(islandSelector).nth(nth);
	// check that the island is present on the page
	await islandLocator.isVisible();
	// scroll to it
	await islandLocator.scrollIntoViewIfNeeded();
	// wait for it to be rendered or hydrated
	const hyrdatedIslandSelector = `gu-island[name="${island}"][data-island-status="${status}"]`;
	const hyrdatedIslandLocator = page.locator(hyrdatedIslandSelector).nth(nth);
	await hyrdatedIslandLocator.waitFor({
		state: 'visible',
		timeout: 120000,
	});
};

export { clearCookie, waitForIsland };
