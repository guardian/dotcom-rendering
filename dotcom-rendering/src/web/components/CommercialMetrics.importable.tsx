import type { ABTest } from '@guardian/ab-core';
import {
	initCommercialMetrics,
	bypassCommercialMetricsSampling as switchOffSampling,
} from '@guardian/commercial-core';
import { getCookie } from '@guardian/libs';
import type { ServerSideTestNames } from '../../types/config';
import { tests } from '../experiments/ab-tests';
import { integrateIMA } from '../experiments/tests/integrate-ima';
import { removePrebidA9Canada } from '../experiments/tests/remove-prebid-a9-canada';
import { useAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { useOnce } from '../lib/useOnce';

type Props = {
	enabled: boolean;
};

export const CommercialMetrics = ({ enabled }: Props) => {
	const ABTestAPI = useAB()?.api;
	const adBlockerInUse = useAdBlockInUse();

	useOnce(() => {
		const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
		const pageViewId = window.guardian.config.ophan.pageViewId;

		// Only send metrics if the switch is enabled
		if (!enabled) return;

		// For these tests switch off sampling and collect metrics for 100% of views
		const clientSideTestsToForceMetrics: ABTest[] = [
			/* keep array multi-line */
			integrateIMA,
			removePrebidA9Canada,
		];

		const userInClientSideTestToForceMetrics = ABTestAPI?.allRunnableTests(
			tests,
		).some((test) =>
			clientSideTestsToForceMetrics.map((t) => t.id).includes(test.id),
		);

		const serverSideTestsToForceMetrics: Array<ServerSideTestNames> = [
			/* keep array multi-line */
			'dcrFrontsVariant',
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
		})
			.then(() => {
				if (
					userInClientSideTestToForceMetrics ||
					userInServerSideTestToForceMetrics
				) {
					// TODO: rename this in commercial-core and update here

					void switchOffSampling();
				}
			})
			.catch((e) =>
				console.error(
					`Error initialising commercial metrics: ${String(e)}`,
				),
			);
	}, [ABTestAPI, adBlockerInUse, enabled]);

	// We don’t render anything
	return null;
};
