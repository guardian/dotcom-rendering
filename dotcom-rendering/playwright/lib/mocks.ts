import type { Page } from '@playwright/test';
import { mostRead } from '../fixtures/manual/most-read';
import { mostReadGeo } from '../fixtures/manual/most-read-geo';

export const mockApis = (page: Page): Promise<[void, void, void]> => {
	const mostReadPromise = page.route('**/most-read/**', (route) => {
		return route.fulfill({
			json: mostRead,
		});
	});
	const mostReadGeoPromise = page.route('**/most-read-geo/**', (route) => {
		return route.fulfill({
			body: JSON.stringify(mostReadGeo),
		});
	});
	const embedPromise = page.route('**/embed/card/**', (route) => {
		return route.fulfill({
			json: { fixture: 'richLink.json' },
		});
	});
	return Promise.all([mostReadPromise, mostReadGeoPromise, embedPromise]);
};
