import type { ABTest } from '@guardian/ab-core';
import {
	bypassCoreWebVitalsSampling,
	getCookie,
	initCoreWebVitals,
} from '@guardian/libs';
import { useAB } from '../lib/useAB';
import { commercialGptLazyLoad } from '../experiments/tests/commercial-gpt-lazy-load';

export const CoreVitals = () => {
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;

	const isDev =
		window.location.hostname === 'm.code.dev-theguardian.com' ||
		window.location.hostname === (process.env.HOSTNAME || 'localhost') ||
		window.location.hostname === 'preview.gutools.co.uk';
	const sampling = 1 / 100;

	const testsToForceMetrics: ABTest[] = [
		/* keep array multi-line */
		commercialGptLazyLoad,
	];

	const ABTestAPI = useAB();

	const userInTestToForceMetrics = testsToForceMetrics.some((test) =>
		ABTestAPI?.runnableTest(test),
	);

	/* eslint-disable @typescript-eslint/no-floating-promises -- they’re async methods */

	initCoreWebVitals({
		browserId,
		pageViewId,
		isDev,
		sampling,
		team: 'dotcom',
	});

	if (window.location.hostname === (process.env.HOSTNAME || 'localhost')) {
		bypassCoreWebVitalsSampling('dotcom');
	}
	if (userInTestToForceMetrics) {
		bypassCoreWebVitalsSampling('commercial');
	}

	/* eslint-enable @typescript-eslint/no-floating-promises */

	// don’t render anything
	return null;
};
