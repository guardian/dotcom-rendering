import type { ABTest, ABTestAPI } from '@guardian/ab-core';
import {
	bypassCommercialMetricsSampling,
	initCommercialMetrics,
} from '@guardian/commercial';
import {
	bypassCoreWebVitalsSampling,
	initCoreWebVitals,
} from '@guardian/core-web-vitals';
import { getCookie } from '@guardian/libs';
import { billboardsInMerchHigh } from '../experiments/tests/billboards-in-merch-high';
import { integrateIma } from '../experiments/tests/integrate-ima';
import { liveblogRightColumnAds } from '../experiments/tests/liveblog-right-column-ads';
import { publicGoodTest } from '../experiments/tests/public-good';
import { useAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { useOnce } from '../lib/useOnce';

type Props = {
	commercialMetricsEnabled: boolean;
};

const sampling = 1 / 100;
/** defining this here allows to share this with other metrics */
const willRecordCoreWebVitals = Math.random() < sampling;

// For these tests switch off sampling and collect metrics for 100% of views
const clientSideTestsToForceMetrics: ABTest[] = [
	/* keep array multi-line */
	integrateIma,
	billboardsInMerchHigh,
	liveblogRightColumnAds,
	publicGoodTest,
];

export const Metrics = ({ commercialMetricsEnabled }: Props) => {
	const abTestApi = useAB()?.api;
	const adBlockerInUse = useAdBlockInUse();

	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;

	const isDev =
		!!window.guardian.config.page.isDev ||
		window.location.hostname === 'm.code.dev-theguardian.com' ||
		window.location.hostname === (process.env.HOSTNAME ?? 'localhost') ||
		window.location.hostname === 'preview.gutools.co.uk';

	const userInServerSideTest =
		Object.keys(window.guardian.config.tests).length > 0;

	const shouldBypassSampling = (api: ABTestAPI) =>
		willRecordCoreWebVitals ||
		userInServerSideTest ||
		clientSideTestsToForceMetrics.some((test) => api.runnableTest(test));

	useOnce(
		function coreWebVitals() {
			// abTestApi should be defined inside useOnce
			const bypassSampling = abTestApi
				? shouldBypassSampling(abTestApi)
				: false;

			/**
			 * We rely on `bypassSampling` rather than the built-in sampling,
			 * but set the value to greater than 0 to avoid console warnings.
			 */
			const nearZeroSampling = Number.MIN_VALUE;

			void initCoreWebVitals({
				browserId,
				pageViewId,
				isDev,
				sampling: nearZeroSampling,
				team: 'dotcom',
			});

			if (bypassSampling || isDev)
				void bypassCoreWebVitalsSampling('commercial');
		},
		[abTestApi],
	);

	useOnce(
		function commercialMetrics() {
			// Only send metrics if the switch is enabled
			if (!commercialMetricsEnabled) return;

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
		[abTestApi, adBlockerInUse, commercialMetricsEnabled],
	);

	// We don’t render anything
	return null;
};
