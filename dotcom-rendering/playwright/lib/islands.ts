import type { Page } from '@playwright/test';

type IslandStatus = 'rendered' | 'hydrated';
type WaitForIslandOptions = {
	nth?: number;
	status?: IslandStatus;
	waitFor?: 'attached' | 'detached' | 'visible' | 'hidden';
};

/**
 * Wait for an island to hydrate
 *
 * Scrolls to the island and waits for its status to be hydrated or rendered and the element to be visible
 *
 */
const waitForIsland = async (
	page: Page,
	name: string,
	options: WaitForIslandOptions = {},
): Promise<void> => {
	const { status = 'rendered', nth = 0, waitFor = 'visible' } = options;
	const islandSelector = `gu-island[name="${name}"]`;
	// create a locator for the island
	const islandLocator = page.locator(islandSelector).nth(nth);
	// check that the island is present on the page
	await islandLocator.waitFor({ state: 'attached', timeout: 30_000 });
	// scroll to it
	await islandLocator.scrollIntoViewIfNeeded();
	// wait for it to be rendered or hydrated
	const hydratedIslandSelector = `gu-island[name="${name}"][data-island-status="${status}"]`;
	const hyrdatedIslandLocator = page.locator(hydratedIslandSelector).nth(nth);
	await hyrdatedIslandLocator.waitFor({
		state: waitFor,
		timeout: 30_000,
	});
};

export { waitForIsland };
