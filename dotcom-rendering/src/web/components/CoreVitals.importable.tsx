import type { ABTest } from '@guardian/ab-core';
import {
	bypassCoreWebVitalsSampling,
	getCookie,
	initCoreWebVitals,
} from '@guardian/libs';
import { dcrJavascriptBundle } from '../../../scripts/webpack/bundles';
import type { ServerSideTestNames } from '../../types/config';
import { useAB } from '../lib/useAB';

export const CoreVitals = () => {
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;

	const isDev =
		window.location.hostname === 'm.code.dev-theguardian.com' ||
		window.location.hostname === (process.env.HOSTNAME || 'localhost') ||
		window.location.hostname === 'preview.gutools.co.uk';
	const sampling = 1 / 100;

	const ABTestAPI = useAB();

	// For these tests switch off sampling and collect metrics for 100% of views
	const clientSideTestsToForceMetrics: ABTest[] = [
		/* keep array multi-line */
	];

	const userInClientSideTestToForceMetrics =
		clientSideTestsToForceMetrics.some((test) =>
			ABTestAPI?.runnableTest(test),
		);

	const serverSideTestsToForceMetrics: Array<ServerSideTestNames> = [
		/* linter, please keep this array multi-line */
		dcrJavascriptBundle('Variant'),
		dcrJavascriptBundle('Control'),
		'dcrFrontsVariant',
	];

	const userInServerSideTestToForceMetrics =
		serverSideTestsToForceMetrics.some((test) =>
			Object.keys(window.guardian.config.tests).includes(test),
		);

	void initCoreWebVitals({
		browserId,
		pageViewId,
		isDev,
		sampling,
		team: 'dotcom',
	});

	if (window.location.hostname === (process.env.HOSTNAME || 'localhost')) {
		void bypassCoreWebVitalsSampling('dotcom');
	}
	if (
		userInClientSideTestToForceMetrics ||
		userInServerSideTestToForceMetrics
	) {
		void bypassCoreWebVitalsSampling('commercial');
	}

	// don’t render anything
	return null;
};
