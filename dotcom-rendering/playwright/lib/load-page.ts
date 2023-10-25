import { type Page } from '@playwright/test';

const loadPage = async (
	page: Page,
	path: string,
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
	// await page.route(/ophan.theguardian.com/, (route) => {
	// 	route.abort();
	// });
	//
	// Instead of aborting ophan change the waituntil to 'domcontentloaded'
	// rather than 'load'. Monitor this to see if it works for our use cases.
	await page.goto(path, { waitUntil: 'domcontentloaded' });
};

export { loadPage };
