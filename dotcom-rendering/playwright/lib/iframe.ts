import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

const getIframeBody = async (
	page: Page,
	iframeSelector: string,
): Promise<Locator> => {
	const iframeBodyLocator = page.frameLocator(iframeSelector).locator('body');
	await expect(iframeBodyLocator).toBeAttached({ timeout: 10000 });
	return iframeBodyLocator;
};

export { getIframeBody };
