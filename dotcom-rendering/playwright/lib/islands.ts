import type { Page } from '@playwright/test';

type IslandStatus = 'rendered' | 'hydrated';
type WaitForIslandOptions = {
	status?: IslandStatus;
	nth?: number;
};

/**
 * Wait for an island to hydrate
 *
 * Scrolls to the island and waits for its status to be hydrated or rendered and the element to be visible
 *
 * @param page
 * @param island
 * @param status
 * @param nth 0 indexed
 */
const waitForIsland = async (
	page: Page,
	island: string,
	options?: WaitForIslandOptions,
): Promise<void> => {
	const { status = 'rendered', nth = 0 } = options ?? {};
	const islandSelector = `gu-island[name="${island}"]`;
	// create a locator for the island
	const islandLocator = page.locator(islandSelector).nth(nth);
	// check that the island is present on the page
	await islandLocator.isVisible();
	// scroll to it
	await islandLocator.scrollIntoViewIfNeeded();
	// wait for it to be rendered or hydrated
	const hyrdatedIslandSelector = `gu-island[name="${island}"][data-island-status="${status}"]`;
	const hyrdatedIslandLocator = page.locator(hyrdatedIslandSelector).nth(nth);
	await hyrdatedIslandLocator.waitFor({
		state: 'visible',
		timeout: 30_000,
	});
};

export { waitForIsland };
