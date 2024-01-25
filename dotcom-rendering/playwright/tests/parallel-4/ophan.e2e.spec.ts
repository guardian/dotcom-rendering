import { isUndefined } from '@guardian/libs';
import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import { cmpAcceptAll, cmpRejectAll, disableCMP } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';

const articleUrl =
	'https://www.theguardian.com/politics/2019/oct/29/tories-restore-party-whip-to-10-mps-who-sought-to-block-no-deal-brexit';

const frontUrl = 'https://www.theguardian.com/uk';

const interceptOphanRequest = ({
	page,
	path,
	searchParamMatcher,
}: {
	page: Page;
	path: string;
	searchParamMatcher: (searchParams: URLSearchParams) => boolean;
}) => {
	return page.waitForRequest((request) => {
		const matchUrl = request
			.url()
			.startsWith(`https://ophan.theguardian.com/${path}`);
		const searchParams = new URLSearchParams(request.url());
		return matchUrl && searchParamMatcher(searchParams);
	});
};

test.describe('Ophan requests', () => {
	test('should make a view request on an article when consent is rejected', async ({
		page,
	}) => {
		const ophanRequestPromise = interceptOphanRequest({
			page,
			path: 'img/1',
			searchParamMatcher: (searchParams: URLSearchParams) => {
				const platform = searchParams.get('platform');
				const url = searchParams.get('url');
				const viewId = searchParams.get('viewId');
				return (
					platform === 'next-gen' &&
					url === page.url() &&
					!isUndefined(viewId)
				);
			},
		});
		await loadPage(page, `/Article/${articleUrl}`);
		await cmpRejectAll(page);
		await ophanRequestPromise;
	});

	test('should make a view request on an article when consent is accepted', async ({
		page,
	}) => {
		const ophanRequestPromise = interceptOphanRequest({
			page,
			path: 'img/1',
			searchParamMatcher: (searchParams: URLSearchParams) => {
				const platform = searchParams.get('platform');
				const url = searchParams.get('url');
				const viewId = searchParams.get('viewId');
				return (
					platform === 'next-gen' &&
					url === page.url() &&
					!isUndefined(viewId)
				);
			},
		});
		await loadPage(page, `/Article/${articleUrl}`);
		await cmpAcceptAll(page);
		await ophanRequestPromise;
	});

	test('should make event requests on an article', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		const ophanExperienceRequestPromise = interceptOphanRequest({
			page,
			path: 'img/2',
			searchParamMatcher: (searchParams: URLSearchParams) => {
				const experiences = searchParams.get('experiences');
				return experiences === 'dotcom-rendering';
			},
		});
		await loadPage(page, `/Article/${articleUrl}`);
		await ophanExperienceRequestPromise;
	});

	test('should make a view request on a front', async ({ context, page }) => {
		await disableCMP(context);
		const ophanRequestPromise = interceptOphanRequest({
			page,
			path: 'img/1',
			searchParamMatcher: (searchParams: URLSearchParams) => {
				const platform = searchParams.get('platform');
				const url = searchParams.get('url');
				const viewId = searchParams.get('viewId');
				return (
					platform === 'next-gen' &&
					url === page.url() &&
					!isUndefined(viewId)
				);
			},
		});
		await loadPage(page, `/Front/${frontUrl}`);
		await ophanRequestPromise;
	});

	test('should make an event request on a front', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		const ophanExperienceRequestPromise = interceptOphanRequest({
			page,
			path: 'img/2',
			searchParamMatcher: (searchParams: URLSearchParams) => {
				const experiences = searchParams.get('experiences');
				return experiences === 'dotcom-rendering';
			},
		});
		await loadPage(page, `/Front/${frontUrl}`);
		await ophanExperienceRequestPromise;
	});
});
