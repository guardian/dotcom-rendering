import type { Page } from '@playwright/test';
import type { DCRArticle } from '../../src/types/frontend';

const PORT = 9000;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Loads a page and centralises setup:
 * - default the base url and port
 * - default the geo region to GB
 * - prevent the support banner from showing
 * - abort all ophan requests
 * - use default waitUntil: 'domcontentloaded' rather than 'load' to speed up tests
 */
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

/**
 * Create a POST request to the /Article endpoint so we can override switches
 * in the json sent to DCR
 */
const loadPageNoOkta = async (
	page: Page,
	article: DCRArticle,
	configOverrides?: Record<string, unknown>,
): Promise<void> => {
	const path = `/Article`;
	await page.route(`${BASE_URL}${path}`, async (route) => {
		const postData = {
			...article,
			config: {
				...article.config,
				...configOverrides,
				switches: {
					...article.config.switches,
					/**
					 * We want to continue using cookies for signed in features
					 * until we figure out how to use Okta in e2e testing.
					 * See https://github.com/guardian/dotcom-rendering/issues/8758
					 */
					okta: false,
					idCookieRefresh: false,
					userFeaturesDcr: true,
				},
			},
		};
		await route.continue({
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			postData,
		});
	});
	await loadPage(page, path);
};

export { BASE_URL, loadPage, loadPageNoOkta };
