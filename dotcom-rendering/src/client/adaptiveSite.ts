import { isServer } from '../lib/isServer';

/**
 * Whether we should adapt the current page to address poor performance issues.
 * Initially this will only happen as part of a @guardian/open-journalism test.
 */
export const shouldAdapt = new Promise<boolean>((resolve) => {
	if (isServer) return resolve(false);
	if (window.location.hash === '#adapt') return resolve(true);
	if (window.guardian.config.tests.adaptiveSiteVariant !== 'variant') {
		return resolve(false);
	}

	// only evaluate this code if we want to adapt in response to page performance
	return void import(
		/* webpackMode: "eager" */ './poorPerformanceMonitoring'
	).then(({ isPerformingPoorly }) => isPerformingPoorly.then(resolve));
});
