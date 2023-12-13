import type { Page } from '@playwright/test';

type WaitForIslandOptions = {
	nth?: number; // 0-based index of the island to wait for
	waitFor?: 'attached' | 'detached' | 'visible' | 'hidden';
};

/**
 * Wait for an island to hydrate
 *
 * Scrolls to the island and waits for its status to be hydrated and the element to be visible
 *
 */
const waitForIsland = async (
	page: Page,
	name: string,
	options: WaitForIslandOptions = {},
): Promise<void> => {
	const { nth = 0, waitFor = 'visible' } = options;
	const islandSelector = `gu-island[name="${name}"]`;
	// create a locator for the island
	const islandLocator = page.locator(islandSelector).nth(nth);
	// check that the island is present on the page
	await islandLocator.waitFor({ state: 'attached', timeout: 30_000 });
	// scroll to it
	await islandLocator.scrollIntoViewIfNeeded();
	// wait for it to be hydrated
	const hydratedIslandLocator = islandLocator.and(
		page.locator('[data-island-status="hydrated"]'),
	);
	await hydratedIslandLocator.waitFor({
		state: waitFor,
		timeout: 30_000,
	});
};

export { waitForIsland };
