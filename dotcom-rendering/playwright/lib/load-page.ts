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
	// Abort all ophan requests as it stops the page from firing the 'load' event
	//
	await page.route(/ophan.theguardian.com/, async (route) => {
		await route.abort();
	});
	//
	// Instead of aborting ophan change the waituntil to 'domcontentloaded'
	// rather than 'load'. Monitor this to see if it works for our use cases.
	await page.goto(`${BASE_URL}${path}`, { waitUntil });
};

export { loadPage };
