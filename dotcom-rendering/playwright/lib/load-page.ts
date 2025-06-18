import type { Page } from '@playwright/test';
import { ORIGIN, ORIGIN_SECURE } from '../../playwright.config';
import type { FEArticle } from '../../src/frontend/feArticle';
import { validateAsFEArticle } from '../../src/model/validate';

type LoadPageOptions = {
	queryParams?: Record<string, string>;
	queryParamsOn?: boolean;
	fragment?: `#${string}`;
	waitUntil?: 'domcontentloaded' | 'load';
	region?: 'GB' | 'US' | 'AU' | 'INT';
	preventSupportBanner?: boolean;
	useSecure?: boolean;
};

const getOrigin = (useSecure?: boolean): string =>
	useSecure ? ORIGIN_SECURE : ORIGIN;

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
	useSecure = false,
}: {
	page: Page;
	path: string;
} & LoadPageOptions): Promise<void> => {
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
				...queryParams,
		  }).toString()}`
		: '';

	// Remove Link prefetch headers from the response headers to prevent Playwright from throwing errors.
	// For some unknown reason when prefetch links are incorrect (e.g. when run from the secure domain r.thegulocal.com)
	// they cause the regular requests initiated by the script elements to error and fail to load.
	// void page.route(`**${path}**`, async (route) => {
	// 	const response = await route.fetch();
	// 	const body = await response.body();
	// 	await route.fulfill({
	// 		response,
	// 		body,
	// 		headers: {
	// 			...response.headers(),
	// 			Link: '',
	// 		},
	// 	});
	// });

	// The default Playwright waitUntil: 'load' ensures all requests have completed
	// Use 'domcontentloaded' to speed up tests and prevent hanging requests from timing out tests
	await page.goto(
		`${getOrigin(useSecure)}${path}${paramsString}${fragment ?? ''}`,
		{
			waitUntil,
		},
	);
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
	options?: LoadPageOptions,
): Promise<void> => {
	const path = `/Article`;
	await page.route(
		`${getOrigin(options?.useSecure)}${path}`,
		async (route) => {
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
		},
	);
	await loadPage({ page, path, queryParamsOn: false, ...options });
};

/**
 * Fetch the page json from the provided URL then load it locally as a POST with overrides
 */
const fetchAndloadPageWithOverrides = async (
	page: Page,
	url: string,
	overrides?: {
		configOverrides?: Record<string, unknown>;
		switchOverrides?: Record<string, unknown>;
	},
	options?: LoadPageOptions,
): Promise<void> => {
	const article = validateAsFEArticle(
		await fetch(`${url}.json?dcr`).then((res) => res.json()),
	);
	await loadPageWithOverrides(
		page,
		article,
		{
			configOverrides: overrides?.configOverrides,
			switchOverrides: {
				...overrides?.switchOverrides,
			},
		},
		options,
	);
};

export { fetchAndloadPageWithOverrides, loadPage, loadPageWithOverrides };
