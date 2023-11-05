import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

const expectToBeVisible = async (
	page: Page,
	selector: string,
	nth = 0,
): Promise<void> => {
	await expect(page.locator(selector).nth(nth)).toBeVisible({
		timeout: 10000,
	});
};

const expectToNotBeVisible = async (
	page: Page,
	selector: string,
	nth = 0,
): Promise<void> => {
	await expect(page.locator(selector).nth(nth)).not.toBeVisible({
		timeout: 10000,
	});
};

const expectToExist = async (
	page: Page,
	selector: string,
	count = 1,
): Promise<void> => {
	await expect(page.locator(selector)).toHaveCount(count, { timeout: 10000 });
};

const expectToNotExist = async (
	page: Page,
	selector: string,
): Promise<void> => {
	await expect(page.locator(selector)).toHaveCount(0, { timeout: 10000 });
};

export {
	expectToBeVisible,
	expectToNotBeVisible,
	expectToExist,
	expectToNotExist,
};
