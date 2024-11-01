import type { Page } from '@playwright/test';
import { PORT } from 'playwright.config';
import { validateAsArticleType } from '../../src/model/validate';
import type { FEArticleType } from '../../src/types/frontend';

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
	waitUntil: 'load' | 'domcontentloaded' = 'domcontentloaded',
	region = 'GB',
	preventSupportBanner = true,
): Promise<void> => {
	await page.addInitScript(
		(args) => {
			// force geo region
			window.localStorage.setItem(
				'gu.geo.override',
				JSON.stringify({ value: args.region }),
			);
			if (args.preventSupportBanner) {
				window.localStorage.setItem(
					'gu.prefs.engagementBannerLastClosedAt',
					`{"value":"${new Date().toISOString()}"}`,
				);
			}
		},
		{ region, preventSupportBanner },
	);
	// The default Playwright waitUntil: 'load' ensures all requests have completed
	// Use 'domcontentloaded' to speed up tests and prevent hanging requests from timing out tests
	await page.goto(`${BASE_URL}${path}`, { waitUntil });
};

/**
 * Create a POST request to the /Article endpoint so we can override config
 * and switches in the fixture json sent to DCR
 */
const loadPageWithOverrides = async (
	page: Page,
	article: FEArticleType,
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
	article: FEArticleType,
	overrides?: {
		configOverrides?: Record<string, unknown>;
		switchOverrides?: Record<string, unknown>;
	},
): Promise<void> => {
	await loadPageWithOverrides(page, article, {
		configOverrides: overrides?.configOverrides,
		switchOverrides: {
			...overrides?.switchOverrides,
			okta: false,
			idCookieRefresh: false,
			userFeaturesDcr: true,
		},
	});
};

/**
 * Fetch the page json from PROD, apply overrides then load locally
 * Useful for when we want to test content that isn't a current fixture
 */
const fetchAndloadPageWithOverrides = async (
	page: Page,
	url: string,
	overrides?: {
		configOverrides?: Record<string, unknown>;
		switchOverrides?: Record<string, unknown>;
	},
): Promise<void> => {
	const article = validateAsArticleType(
		await fetch(`${url}.json?dcr`).then((res) => res.json()),
	);
	await loadPageWithOverrides(page, article, {
		configOverrides: overrides?.configOverrides,
		switchOverrides: {
			...overrides?.switchOverrides,
		},
	});
};

export {
	BASE_URL,
	fetchAndloadPageWithOverrides,
	loadPage,
	loadPageNoOkta,
	loadPageWithOverrides,
};
