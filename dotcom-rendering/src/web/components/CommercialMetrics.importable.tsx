import type { ABTest } from '@guardian/ab-core';
import {
	initCommercialMetrics,
	bypassCommercialMetricsSampling as switchOffSampling,
} from '@guardian/commercial-core';
import { getCookie } from '@guardian/libs';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { useOnce } from '../lib/useOnce';
import { tests } from '../experiments/ab-tests';
import { commercialLazyLoadMargin } from '../experiments/tests/commercial-lazy-load-margin';
import { useAB } from '../lib/useAB';
import { prebidPriceGranularity } from '../experiments/tests/prebid-price-granularity';

type Props = {
	enabled: boolean;
};

export const CommercialMetrics = ({ enabled }: Props) => {
	const ABTestAPI = useAB();
	const adBlockerInUse = useAdBlockInUse();

	useOnce(() => {
		const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
		const pageViewId = window.guardian?.config?.ophan?.pageViewId;

		// Only send metrics if the switch is enabled
		if (!enabled) return;

		// For these tests switch off sampling and collect metrics for 100% of views
		const clientSideTestsToForceMetrics: ABTest[] = [
			/* keep array multi-line */
			commercialLazyLoadMargin,
			prebidPriceGranularity,
		];

		const userInClientSideTestToForceMetrics = ABTestAPI?.allRunnableTests(
			tests,
		).some((test) =>
			clientSideTestsToForceMetrics.map((t) => t.id).includes(test.id),
		);

		const serverSideTestsToForceMetrics: Array<keyof ServerSideTests> = [
			/* keep array multi-line */
			'inline1ContainerSizingVariant',
			'inline1ContainerSizingControl',
		];

		const userInServerSideTestToForceMetrics =
			serverSideTestsToForceMetrics.some((test) =>
				Object.keys(window.guardian.config.tests).includes(test),
			);

		const isDev =
			window.guardian.config.page.isDev ||
			window.location.hostname.includes(
				process.env.HOSTNAME || 'localhost',
			);

		initCommercialMetrics({
			pageViewId,
			browserId: browserId || undefined,
			isDev,
			adBlockerInUse,
		});

		if (
			userInClientSideTestToForceMetrics ||
			userInServerSideTestToForceMetrics
		) {
			// TODO: rename this in commercial-core and update here
			switchOffSampling();
		}
	}, [ABTestAPI, adBlockerInUse, enabled]);

	// We don’t render anything
	return null;
};
