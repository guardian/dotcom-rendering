import type { Page } from '@playwright/test';
import type { DCRArticle } from '../../src/types/frontend';

const PORT = 9000;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Loads a page and centralises setup:
 * - default the base url and port
 * - default the geo region to GB
 * - prevent the support banner from showing
 */
const loadPage = async (
	page: Page,
	path: string,
	waitUntil: 'load' | 'domcontentloaded' = 'load',
	region = 'GB',
	preventSupportBanner = true,
): Promise<void> => {
	await page.addInitScript((regionProvided) => {
		// force geo region
		window.localStorage.setItem(
			'gu.geo.override',
			JSON.stringify({ value: regionProvided }),
		);
		if (preventSupportBanner) {
			window.localStorage.setItem(
				'gu.prefs.engagementBannerLastClosedAt',
				`{"value":"${new Date().toISOString()}"}`,
			);
		}
	}, region);
	// The default waitUntil: 'load' ensures all requests have completed
	// For specific cases that do not rely on JS use 'domcontentloaded' to speed up tests
	await page.goto(`${BASE_URL}${path}`, { waitUntil });
};

/**
 * Create a POST request to the /Article endpoint so we can override config
 * and switches in the json sent to DCR
 */
const loadPageWithOverrides = async (
	page: Page,
	article: DCRArticle,
	overrides?: {
		configOverrides?: Record<string, unknown>;
		switchOverrides?: Record<string, unknown>;
	},
): Promise<void> => {
	const path = `/Article`;
	await page.route(`${BASE_URL}${path}`, async (route) => {
		const postData = {
			...article,
			config: {
				...article.config,
				...overrides?.configOverrides,
				switches: {
					...article.config.switches,
					...overrides?.switchOverrides,
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

/**
 * Allows us to continue using cookies for signed in features
 * until we figure out how to use Okta in e2e testing.
 * See https://github.com/guardian/dotcom-rendering/issues/8758
 */
const loadPageNoOkta = async (
	page: Page,
	article: DCRArticle,
	overrides?: {
		configOverrides?: Record<string, unknown>;
		switchOverrides?: Record<string, unknown>;
	},
): Promise<void> => {
	return loadPageWithOverrides(page, article, {
		configOverrides: overrides?.configOverrides,
		switchOverrides: {
			...overrides?.switchOverrides,
			okta: false,
			idCookieRefresh: false,
			userFeaturesDcr: true,
		},
	});
};

export { BASE_URL, loadPage, loadPageWithOverrides, loadPageNoOkta };
