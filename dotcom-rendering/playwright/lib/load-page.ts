import type { Page } from '@playwright/test';
import { ORIGIN } from '../../playwright.config';
import type { FEArticle } from '../../src/frontend/feArticle';
import type { FEFront } from '../../src/frontend/feFront';
import {
	validateAsFEArticle,
	validateAsFEFront,
} from '../../src/model/validate';

type LoadPageOptions = {
	queryParams?: Record<string, string>;
	queryParamsOn?: boolean;
	fragment?: `#${string}`;
	waitUntil?: 'domcontentloaded' | 'load';
	region?: 'GB' | 'US' | 'AU' | 'INT';
	preventSupportBanner?: boolean;
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

const getDcrPostUrl = (path: string) => `${ORIGIN}/${path.split('/')[1]}`;

const getFrontendUrl = (path: string) => {
	const secondSlashIndex = path.indexOf('/', 1);
	const contentUrl = path.substring(secondSlashIndex + 1);
	return `${contentUrl}.json?dcr`;
};

const getDcrUrl = ({
	path,
	queryParamsOn,
	queryParams,
}: Required<
	Pick<LoadPageParams, 'path' | 'queryParamsOn' | 'queryParams'>
>): string => {
	const paramsString = queryParamsOn
		? `?${new URLSearchParams({
				adtest: 'fixed-puppies-ci',
				...queryParams,
		  }).toString()}`
		: '';

	return `${ORIGIN}${path}${paramsString}`;
};

const getFrontendArticle = async (
	url: string,
): Promise<FEArticle | FEFront> => {
	try {
		const response = await fetch(getFrontendUrl(url));
		if (!response.ok) {
			throw new Error(
				`Failed to fetch article JSON from ${url}: ${response.statusText}`,
			);
		}
		if (url.startsWith('/Article')) {
			return validateAsFEArticle(await response.json());
		} else if (url.startsWith('/Front')) {
			return validateAsFEFront(await response.json());
		}
		throw new Error(`Unsupported URL for fetching article: ${url}`);
	} catch (error) {
		throw new Error(
			`Error fetching or validating article JSON from ${url}: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);
	}
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

	// If overrides exist, but no article fixture we fetch it from Frontend
	const frontendArticle = await (overrides.article
		? Promise.resolve(overrides.article)
		: getFrontendArticle(path));

	// Apply the overrides to the article config and switches
	const postData = {
		...frontendArticle,
		config: {
			...frontendArticle.config,
			...overrides.configOverrides,
			switches: {
				...frontendArticle.config.switches,
				...overrides.switchOverrides,
			},
		},
	};

	const dcrUrl = getDcrUrl({
		path,
		queryParamsOn,
		queryParams,
	});

	// Override the request to the DCR URL to use a POST method
	// with the overridden payload
	await page.route(dcrUrl, async (route) => {
		await route.continue({
			method: 'POST',
			headers: {
				...route.request().headers(),
				'Content-Type': 'application/json',
			},
			postData,
			url: getDcrPostUrl(path),
		});
	});

	await page.goto(`${dcrUrl}${fragment ?? ''}`, { waitUntil });
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
