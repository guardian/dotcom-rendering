import { isServer } from '../lib/isServer';

/**
 * Whether we should adapt the current page to address poor performance issues.
 * Initially this will only happen as part of a @guardian/open-journalism test.
 */
export const shouldAdapt = async (): Promise<boolean> => {
	if (isServer) return false;
	if (window.location.hash === '#adapt') return true;
	if (window.guardian.config.tests.adaptiveSiteVariant !== 'variant') {
		return false;
	}

	// only evaluate this code if we want to adapt in response to page performance
	const { isPerformingPoorly } = await import(
		/* webpackMode: "eager" */ './poorPerformanceMonitoring'
	);

	return isPerformingPoorly();
};
