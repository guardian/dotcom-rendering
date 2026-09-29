import type { NavType } from '../model/extract-nav';

export const CUSTOM_SUBNAV_TEST = 'webx-display-custom-subnavs';

/**
 * Removes the custom subnav unless the user is in the test.
 */
export const applyCustomSubnavTest = <T extends NavType>(
	nav: T,
	serverSideABTests: Record<string, string>,
): T =>
	serverSideABTests[CUSTOM_SUBNAV_TEST] === 'variant'
		? nav
		: { ...nav, customSubNav: undefined };
