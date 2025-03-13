import { isUndefined } from '@guardian/libs';
import { test } from '@playwright/test';
import {
	ADDITIONAL_REQUEST_PATH,
	IMPRESSION_REQUEST_PATH,
	interceptOphanRequest,
} from 'playwright/lib/ophan';
import {
	allowRejectAll,
	cmpAcceptAll,
	cmpRejectAll,
	disableCMP,
} from '../lib/cmp';
import { loadPage } from '../lib/load-page';

const articleUrl =
	'https://www.theguardian.com/politics/2019/oct/29/tories-restore-party-whip-to-10-mps-who-sought-to-block-no-deal-brexit';

const frontUrl = 'https://www.theguardian.com/uk';

test.describe('Ophan requests', () => {
	/**
	 * Why is this test skipped?
	 *
	 * Since the launch of Guardian Ad Lite, rejecting all cookies takes the user to the "Consent or Pay" page,
	 * instead of removing the cookie banner. This new behaviour is causing the below test to fail.
	 */
	test.skip('should make an IMPRESSION request on an article when consent is rejected', async ({
		page,
		context,
	}) => {
		await allowRejectAll(context);
		const ophanImpressionRequestPromise = interceptOphanRequest({
			page,
			path: IMPRESSION_REQUEST_PATH,
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
		await loadPage({ page, path: `/Article/${articleUrl}` });
		await cmpRejectAll(page);
		await ophanImpressionRequestPromise;
	});

	test('should make an IMPRESSION request on an article when consent is accepted', async ({
		page,
	}) => {
		const ophanImpressionRequestPromise = interceptOphanRequest({
			page,
			path: IMPRESSION_REQUEST_PATH,
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
		await loadPage({ page, path: `/Article/${articleUrl}` });
		await cmpAcceptAll(page);
		await ophanImpressionRequestPromise;
	});

	test('should make an ADDITIONAL experiences request on an article', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		const ophanExperienceRequestPromise = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (searchParams: URLSearchParams) => {
				const experiences = searchParams.get('experiences');
				return experiences === 'dotcom-rendering';
			},
		});
		await loadPage({ page, path: `/Article/${articleUrl}` });
		await ophanExperienceRequestPromise;
	});

	test('should make an IMPRESSION request on a front', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		const ophanImpressionRequestPromise = interceptOphanRequest({
			page,
			path: IMPRESSION_REQUEST_PATH,
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
		await loadPage({ page, path: `/Front/${frontUrl}` });
		await ophanImpressionRequestPromise;
	});

	test('should make an ADDITIONAL experiences request on a front', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		const ophanExperienceRequestPromise = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (searchParams: URLSearchParams) => {
				const experiences = searchParams.get('experiences');
				return experiences === 'dotcom-rendering';
			},
		});
		await loadPage({ page, path: `/Front/${frontUrl}` });
		await ophanExperienceRequestPromise;
	});
});
