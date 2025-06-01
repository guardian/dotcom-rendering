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
	overrides?: {
		configOverrides?: Record<string, unknown>;
		switchOverrides?: Record<string, unknown>;
		article?: FEArticle;
	};
};

type LoadPageParams = {
	page: Page;
	path: string;
} & LoadPageOptions;

const getOrigin = (useSecure?: boolean): string =>
	useSecure ? ORIGIN_SECURE : ORIGIN;

const getUrl = ({
	path,
	useSecure,
	queryParamsOn,
	queryParams,
	fragment,
}: Required<
	Pick<LoadPageParams, 'path' | 'useSecure' | 'queryParamsOn' | 'queryParams'>
> &
	Pick<LoadPageParams, 'fragment'>): string => {
	const paramsString = queryParamsOn
		? `?${new URLSearchParams({
				adtest: 'fixed-puppies-ci',
				...queryParams,
		  }).toString()}`
		: '';

	return `${getOrigin(useSecure)}${path}${paramsString}${fragment ?? ''}`;
};

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
	overrides = {},
}: LoadPageParams): Promise<void> => {
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

	const url = getUrl({
		path,
		useSecure,
		queryParamsOn,
		queryParams,
		fragment,
	});

	const hasOverrides =
		overrides.configOverrides ??
		overrides.switchOverrides ??
		overrides.article;

	if (hasOverrides) {
		// If we have overrides, the overrides.article property is expected to be present.
		// We apply the overrides to the article config and switches and then send the
		// modified JSON payload to DCR
		const postData = {
			...overrides.article,
			config: {
				...overrides.article?.config,
				...overrides.configOverrides,
				switches: {
					...overrides.article?.config.switches,
					...overrides.switchOverrides,
				},
			},
		};

		void page.route(url, async (route) => {
			// To override config or switches we need to make a POST request to DCR so
			// we can apply the overrides
			const modifiedResponse = await route.fetch({
				url: `${getOrigin(useSecure)}/Article`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				postData,
			});
			const body = await modifiedResponse.body();
			// Remove Link prefetch headers from the response headers to prevent Playwright from throwing errors.
			// For some unknown reason when prefetch links are incorrect (e.g. when run from the secure domain r.thegulocal.com)
			// they cause the corresponding requests initiated by the script elements to error and fail to load.
			await route.fulfill({
				body,
				headers: {
					...modifiedResponse.headers(),
					Link: '',
				},
			});
		});

		await page.goto(url, { waitUntil });
	} else {
		void page.route(url, async (route) => {
			const modifiedResponse = await route.fetch({ url });
			const body = await modifiedResponse.body();
			await route.fulfill({
				body,
				headers: {
					...modifiedResponse.headers(),
					Link: '',
				},
			});
		});

		// The default Playwright waitUntil: 'load' ensures all requests have completed
		// Use 'domcontentloaded' to speed up tests and prevent hanging requests from timing out tests
		await page.goto(url, { waitUntil });
	}
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
	await loadPage({
		page,
		path: '/Article',
		queryParamsOn: false,
		...options,
		overrides: { ...overrides, article },
	});
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
