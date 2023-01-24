import type { ABTest, ABTestAPI } from '@guardian/ab-core';
import {
	bypassCommercialMetricsSampling,
	initCommercialMetrics,
} from '@guardian/commercial-core';
import {
	bypassCoreWebVitalsSampling,
	initCoreWebVitals,
} from '@guardian/core-web-vitals';
import { getCookie } from '@guardian/libs';
import { dcrJavascriptBundle } from '../../../scripts/webpack/bundles';
import type { ServerSideTestNames } from '../../types/config';
import { integrateIma } from '../experiments/tests/integrate-ima';
import { useAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { useOnce } from '../lib/useOnce';

type Props = {
	enabled: boolean;
};

const sampling = 1 / 100;
/** defining this here allows to share this with other metrics */
const willRecordCoreWebVitals = Math.random() < sampling;

// For these tests switch off sampling and collect metrics for 100% of views
const clientSideTestsToForceMetrics: ABTest[] = [
	/* keep array multi-line */
	integrateIma,
];

const serverSideTestsToForceMetrics: ServerSideTestNames[] = [
	/* linter, please keep this array multi-line */
	dcrJavascriptBundle('Variant'),
	dcrJavascriptBundle('Control'),
	'dcrFrontsVariant',
];

export const Metrics = ({ enabled }: Props) => {
	const abTestApi = useAB()?.api;
	const adBlockerInUse = useAdBlockInUse();

	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;

	const isDev =
		!!window.guardian.config.page.isDev ||
		window.location.hostname === 'm.code.dev-theguardian.com' ||
		window.location.hostname === (process.env.HOSTNAME ?? 'localhost') ||
		window.location.hostname === 'preview.gutools.co.uk';

	const userInServerSideTestToForceMetrics =
		serverSideTestsToForceMetrics.some((test) =>
			Object.keys(window.guardian.config.tests).includes(test),
		);

	const shouldBypassSampling = (api: ABTestAPI) =>
		willRecordCoreWebVitals ||
		userInServerSideTestToForceMetrics ||
		clientSideTestsToForceMetrics.some((test) => api.runnableTest(test));

	useOnce(
		function coreWebVitals() {
			// abTestApi should be defined inside useOnce
			const bypassSampling = abTestApi
				? shouldBypassSampling(abTestApi)
				: false;

			void initCoreWebVitals({
				browserId,
				pageViewId,
				isDev,
				sampling: 0, // we rely on `bypassSampling` instead
				team: 'dotcom',
			});

			if (isDev) void bypassCoreWebVitalsSampling();
			if (bypassSampling) void bypassCoreWebVitalsSampling('commercial');
		},
		[abTestApi],
	);

	useOnce(
		function commercialMetrics() {
			// Only send metrics if the switch is enabled
			if (!enabled) return;

			// abTestApi should be defined inside useOnce
			const bypassSampling = abTestApi
				? shouldBypassSampling(abTestApi)
				: false;

			initCommercialMetrics({
				pageViewId,
				browserId: browserId ?? undefined,
				isDev,
				adBlockerInUse,
			})
				.then(() => {
					if (bypassSampling || isDev) {
						void bypassCommercialMetricsSampling();
					}
				})
				.catch((e) =>
					console.error(
						`Error initialising commercial metrics: ${String(e)}`,
					),
				);
		},
		[abTestApi, adBlockerInUse, enabled],
	);

	// We don’t render anything
	return null;
};
