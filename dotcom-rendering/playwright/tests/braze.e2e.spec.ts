import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import { Standard as standardArticle } from '../../fixtures/generated/articles/Standard';
import { cmpAcceptAll } from '../lib/cmp';
import { addCookie, clearCookie } from '../lib/cookies';
import { loadPageNoOkta } from '../lib/load-page';
import { stubResponse } from '../lib/network';

const idapiIdentifiersResponse = {
	id: '000000000',
	brazeUuid: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
	puzzleUuid: 'aaaaaaaaaaaa',
	googleTagId: 'aaaaaaaaaaaa',
};

const expectLocalStorageItem = (
	page: Page,
	key: string,
	value: string | null,
) => {
	return page.waitForFunction(
		(args) => {
			const itemValue = window.localStorage.getItem(args.key);
			// eslint-disable-next-line no-console -- test
			console.log(
				`localstorage item ${args.key} is ${String(itemValue)}`,
			);
			return itemValue === args.value;
		},
		{ key, value },
		{ polling: 250, timeout: 30_000 },
	);
};

test.describe('Braze messaging', () => {
	test('records in local storage that the Braze SDK was loaded', async ({
		context,
		page,
	}) => {
		// Become logged in
		await addCookie(context, { name: 'GU_U', value: 'true' });

		await addCookie(context, {
			name: 'gu_hide_support_messaging',
			value: 'true',
		});

		// Mock call to '/user/me/identifiers'
		const idapiReponseProfile = stubResponse(
			page,
			'**/user/me/identifiers',
			{
				json: idapiIdentifiersResponse,
			},
		);

		// Set browser id
		await addCookie(context, { name: 'bwid', value: 'myBrowserId' });

		const choiceGdprRequestPromise =
			page.waitForRequest('**/choice/gdpr/**');

		await loadPageNoOkta(page, standardArticle);

		await cmpAcceptAll(page);

		await idapiReponseProfile;
		await choiceGdprRequestPromise;

		await loadPageNoOkta(page, standardArticle);

		// Wait for the gu.brazeUserSet flag to be set in localStorage
		await expectLocalStorageItem(page, 'gu.brazeUserSet', 'true');
	});

	test('clears Braze data when a user logs out', async ({
		context,
		page,
	}) => {
		// Become logged in
		await addCookie(context, { name: 'GU_U', value: 'true' });

		await addCookie(context, {
			name: 'gu_hide_support_messaging',
			value: 'true',
		});

		// Mock call to '/user/me/identifiers'
		const idapiReponseProfile = stubResponse(
			page,
			'**/user/me/identifiers',
			{
				json: idapiIdentifiersResponse,
			},
		);

		// Set browser id
		await addCookie(context, { name: 'bwid', value: 'myBrowserId' });

		const choiceGdprRequestPromise =
			page.waitForRequest('**/choice/gdpr/**');

		await loadPageNoOkta(page, standardArticle);

		await cmpAcceptAll(page);

		await idapiReponseProfile;
		await choiceGdprRequestPromise;

		await loadPageNoOkta(page, standardArticle);

		await expectLocalStorageItem(page, 'gu.brazeUserSet', 'true');

		// Set cache data in localStorage so we can check it's cleared below
		await page.evaluate(() => {
			window.localStorage.setItem(
				'gu.brazeMessageCache.EndOfArticle',
				'[]',
			);
			window.localStorage.setItem('gu.brazeMessageCache.Banner', '[]');
		});

		// User no longer logged in
		await clearCookie(context, 'GU_U');

		// Make a third call when logged out
		await loadPageNoOkta(page, standardArticle);

		// Wait for the gu.brazeUserSet flag to NOT be set in localStorage
		await expectLocalStorageItem(page, 'gu.brazeUserSet', null);

		// Wait for the gu.brazeMessageCache.EndOfArticle flag to NOT be set in localStorage
		await expectLocalStorageItem(
			page,
			'gu.brazeMessageCache.EndOfArticle',
			null,
		);

		// Wait for the gu.brazeMessageCache.Banner flag to NOT be set in localStorage
		await expectLocalStorageItem(page, 'gu.brazeMessageCache.Banner', null);
	});
});
