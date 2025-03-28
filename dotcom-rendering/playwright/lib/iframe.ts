import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

const getIframeBody = async (
	page: Page,
	iframeSelector: string,
): Promise<Locator> => {
	const iframeBodyLocator = page.frameLocator(iframeSelector).locator('body');
	await expect(iframeBodyLocator).toBeAttached({ timeout: 10_000 });
	return iframeBodyLocator;
};

const getIframePart = async (
	page: Page,
	iframeSelector: string,
	partSelector: string,
): Promise<Locator> => {
	const iframePartLocator = page
		.frameLocator(iframeSelector)
		.locator(partSelector);
	await expect(iframePartLocator).toBeAttached({ timeout: 10_000 });
	return iframePartLocator;
};

export { getIframeBody, getIframePart };
