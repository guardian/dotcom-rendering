import type { Page } from '@playwright/test';

const PORT = 9000;
const BASE_URL = `http://localhost:${PORT}`;

const loadPage = async (
	page: Page,
	path: string,
	waitUntil: 'load' | 'domcontentloaded' = 'domcontentloaded',
	region = 'GB',
): Promise<void> => {
	await page.addInitScript((regionProvided) => {
		// force geo region
		window.localStorage.setItem(
			'gu.geo.override',
			JSON.stringify({ value: regionProvided }),
		);
		// prevent support banner
		window.localStorage.setItem(
			'gu.prefs.engagementBannerLastClosedAt',
			`{"value":"${new Date().toISOString()}"}`,
		);
	}, region);
	// Abort all ophan requests as they hang and stop the page from firing the 'load' event
	await page.route(/ophan.theguardian.com/, async (route) => {
		await route.abort();
	});
	// Use default waitUntil: 'domcontentloaded' rather than 'load' to speed up tests
	// If this causes any issues use 'load' instead
	await page.goto(`${BASE_URL}${path}`, { waitUntil });
};

export { loadPage };
