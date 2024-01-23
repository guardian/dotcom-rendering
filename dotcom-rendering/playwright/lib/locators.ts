import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

const TEN_SECONDS = 10_000;

const expectToBeVisible = async (
	page: Page,
	selector: string,
	nth = 0,
): Promise<void> => {
	await expect(page.locator(selector).nth(nth)).toBeVisible({
		timeout: TEN_SECONDS,
	});
};

const expectToNotBeVisible = async (
	page: Page,
	selector: string,
	nth = 0,
): Promise<void> => {
	await expect(page.locator(selector).nth(nth)).not.toBeVisible({
		timeout: TEN_SECONDS,
	});
};

const expectToExist = async (
	page: Page,
	selector: string,
	count = 1,
): Promise<void> => {
	await expect(page.locator(selector)).toHaveCount(count, {
		timeout: TEN_SECONDS,
	});
};

const expectToNotExist = async (
	page: Page,
	selector: string,
): Promise<void> => {
	await expect(page.locator(selector)).toHaveCount(0, {
		timeout: TEN_SECONDS,
	});
};

const expectLocatorToExist = async (
	page: Page,
	locator: Locator,
	count = 1,
): Promise<void> => {
	await expect(locator).toHaveCount(count, { timeout: TEN_SECONDS });
};

const expectLocatorToNotExist = async (
	page: Page,
	locator: Locator,
): Promise<void> => {
	await expect(locator).toHaveCount(0, { timeout: TEN_SECONDS });
};

export {
	expectToBeVisible,
	expectToNotBeVisible,
	expectToExist,
	expectToNotExist,
	expectLocatorToExist,
	expectLocatorToNotExist,
};
