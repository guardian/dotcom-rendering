import type { Page, Route } from '@playwright/test';

/**
 * Stubs a network response for a given URL
 *
 * @param page
 * @param url The URL to stub can be a string, glob or a regex
 * @param fulfill The route fulfill object: https://playwright.dev/docs/api/class-route#route-fulfill
 * @param times The number of times the route should be stubbed
 */
const stubResponse = async (
	page: Page,
	url: string | RegExp,
	fulfill: Parameters<Route['fulfill']>[0],
	times = 1,
): Promise<void> => {
	await page.route(
		url,
		async (route) => {
			await route.fulfill(fulfill);
		},
		{ times },
	);
};

export { stubResponse };
