import type { Page } from '@playwright/test';
import { PORT } from 'playwright.config';
import type { FEArticle } from '../../src/frontend/feArticle';
import { validateAsFEArticle } from '../../src/model/validate';

const BASE_URL = `http://localhost:${PORT}`;

/**
 * Loads a page in Playwright and centralises setup
 */
const loadPage = async ({
	page,
	path,
	queryParams = {},
	queryParamsOn = true,
	fragment,
	waitUntil = 'domcontentloaded',
	region = 'GB',
	preventSupportBanner = true,
}: {
	page: Page;
	path: string;
	queryParams?: Record<string, string>;
	queryParamsOn?: boolean;
	fragment?: `#${string}`;
	waitUntil?: 'domcontentloaded' | 'load';
	region?: 'GB' | 'US' | 'AU' | 'INT';
	preventSupportBanner?: boolean;
}): Promise<void> => {
	await page.addInitScript(
		(args) => {
			// Set the geo region, defaults to GB
			window.localStorage.setItem(
				'gu.geo.override',
				JSON.stringify({ value: args.region }),
			);
			// Prevent the support banner from showing
			if (args.preventSupportBanner) {
				window.localStorage.setItem(
					'gu.prefs.engagementBannerLastClosedAt',
					`{"value":"${new Date().toISOString()}"}`,
				);
			}
		},
		{
			region,
			preventSupportBanner,
		},
	);
	// Add an adtest query param to ensure we get a fixed test ad
	const paramsString = queryParamsOn
		? `?${new URLSearchParams({
				adtest: 'fixed-puppies-ci',
				_sp_geo_override: `${region}-${region}`,
				...queryParams,
		  }).toString()}`
		: '';

	// The default Playwright waitUntil: 'load' ensures all requests have completed
	// Use 'domcontentloaded' to speed up tests and prevent hanging requests from timing out tests
	await page.goto(`${BASE_URL}${path}${paramsString}${fragment ?? ''}`, {
		waitUntil,
	});
};

/**
 * Create a POST request to the /Article endpoint so we can override config
 * and switches in the json sent to DCR
 */
const loadPageWithOverrides = async (
	page: Page,
	article: FEArticle,
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
	await loadPage({ page, path, queryParamsOn: false });
};

/**
 * Fetch the page json from PROD then load it as a POST with overrides
 */
const fetchAndloadPageWithOverrides = async (
	page: Page,
	url: string,
	overrides?: {
		configOverrides?: Record<string, unknown>;
		switchOverrides?: Record<string, unknown>;
	},
): Promise<void> => {
	const article = validateAsFEArticle(
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
	loadPageWithOverrides,
};
