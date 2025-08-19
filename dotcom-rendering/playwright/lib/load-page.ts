import type { Cookie, Page } from '@playwright/test';
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

/**
 * @param path The path for a DCR endpoint path
 *		e.g. `/Article/https://www.theguardian.com/world/2025/aug/19/the-big-church-move-sweden-kiruna-kyrka`
 * @returns The Frontend URL to fetch the JSON payload
 *		e.g. `https://www.theguardian.com/world/2025/aug/19/the-big-church-move-sweden-kiruna-kyrka.json`
 */
const getFrontendJsonUrl = (path: string) => {
	const secondSlashIndex = path.indexOf('/', 1);
	const contentUrl = path.substring(secondSlashIndex + 1);
	return `${contentUrl}.json`;
};

/**
 * @param path The Frontend URL to fetch the JSON payload
 *		e.g. `https://www.theguardian.com/world/2025/aug/19/the-big-church-move-sweden-kiruna-kyrka`
 * @param cookies Cookies to send with the request
 *		e.g. `GU_EDITION=US`
 * @param queryParams Query parameters to append to the request
 *		e.g. `live=true` for live blogs
 * @returns The JSON response from the Frontend URL
 */
const getFrontendJson = async (
	path: string,
	cookies: Cookie[],
	queryParams: LoadPageParams['queryParams'],
): Promise<unknown> => {
	try {
		const paramsString = `${new URLSearchParams({
			dcr: 'true',
			...queryParams,
		}).toString()}`;
		const frontendUrl = `${getFrontendJsonUrl(path)}?${paramsString}`;
		const cookie = cookies.map((c) => `${c.name}=${c.value}`).join('; ');
		const response = await fetch(frontendUrl, { headers: { cookie } });
		if (!response.ok) {
			throw new Error(
				`Failed to fetch from ${path}: ${response.statusText}`,
			);
		}
		return response.json();
	} catch (error) {
		throw new Error(
			`Error fetching from ${path}: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);
	}
};

/**
 * Validates the JSON response from the Frontend URL based on the path.

 * Add more validation logic here if additional content types are required.
 *
 * @param path The path for a DCR endpoint, used to determine the content type.
 *		e.g. `/Article/https://www.theguardian.com/world/2025/aug/19/the-big-church-move-sweden-kiruna-kyrka`
 * @param json The JSON response from the Frontend URL
 * @returns The validated `FEArticle` or `FEFront` object
 */
const validateJson = (path: string, json: unknown): FEArticle | FEFront => {
	if (path.startsWith('/Article')) {
		return validateAsFEArticle(json);
	} else if (path.startsWith('/Front')) {
		return validateAsFEFront(json);
	}
	throw new Error(`Unsupported URL for validating article: ${path}`);
};

/**
 * Constructs a DCR URL for a given path and query parameters.
 * @param params The parameters for constructing the DCR URL
 * @param params.path The path for a DCR endpoint
 * @param params.queryParamsOn Whether to append query parameters to the URL
 * @param params.queryParams Query parameters to append to the request
 * @returns The DCR URL
 * e.g. `http://localhost:9000/Article/https://theguardian.com/sport/live/2022/mar/27/west-indies-v-england-third-test-day-four-live?adtest=fixed-puppies-ci&live=true&force-liveblog-epic=true`
 */
const getDcrUrl = ({
	path,
	queryParamsOn,
	queryParams,
}: Pick<LoadPageParams, 'path' | 'queryParamsOn' | 'queryParams'>): string => {
	const paramsString = queryParamsOn
		? `?${new URLSearchParams({
				adtest: 'fixed-puppies-ci',
				...queryParams,
		  }).toString()}`
		: '';
	return `${ORIGIN}${path}${paramsString}`;
};

/**
 * Constructs a DCR POST URL for a given path.
 * @param path The path for a DCR endpoint
 *		e.g. `/Article/https://www.theguardian.com/world/2025/aug/19/the-big-church-move-sweden-kiruna-kyrka`
 * @returns The DCR POST URL to send the request to
 *		e.g. `http://localhost:9000/Article`
 *		This is used to override the request method to POST in Playwright tests.
 */
const getDcrPostUrl = (path: string) => `${ORIGIN}/${path.split('/')[1]}`;

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

	const cookies = await page.context().cookies();

	// If overrides exist, but no article fixture we fetch it from Frontend
	const frontendPage = await (overrides.article
		? Promise.resolve(overrides.article)
		: validateJson(
				path,
				await getFrontendJson(path, cookies, queryParams),
		  ));

	// Apply the overrides to the article config and switches
	const postData = {
		...frontendPage,
		config: {
			...frontendPage.config,
			...overrides.configOverrides,
			switches: {
				...frontendPage.config.switches,
				...overrides.switchOverrides,
			},
		},
	};

	const dcrUrl = getDcrUrl({
		path,
		queryParamsOn,
		queryParams,
	});

	// Override any request matching dcrUrl to use a POST method
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

	// Initiate the page load
	// Add the fragment here as Playwright has an issue when matching urls
	// with fragments in the page.route handler
	await page.goto(`${dcrUrl}${fragment ?? ''}`, { waitUntil });
};

export { loadPage };
