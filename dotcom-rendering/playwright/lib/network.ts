import type { Page, Route } from '@playwright/test';

const stubResponse = async (
	page: Page,
	url: string | RegExp,
	fulfill: Parameters<Route['fulfill']>[0],
): Promise<void> => {
	await page.route(url, async (route) => {
		await route.fulfill(fulfill);
	});
};

export { stubResponse };
