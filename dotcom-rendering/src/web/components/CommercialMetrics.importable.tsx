import type { ABTest } from '@guardian/ab-core';
import {
	initCommercialMetrics,
	bypassCommercialMetricsSampling as switchOffSampling,
} from '@guardian/commercial-core';
import { getCookie } from '@guardian/libs';
import { useAB } from '@guardian/ab-react';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { WithABProvider } from './WithABProvider';
import { useOnce } from '../lib/useOnce';
import { tests } from '../experiments/ab-tests';
import { spacefinderOkrMegaTest } from '../experiments/tests/spacefinder-okr-mega-test';

type Props = {
	enabled: boolean;
	switches: Switches;
	isSensitive: boolean;
	isDev?: boolean;
};

const CommercialMetricsWithAB = ({ enabled }: { enabled: boolean }) => {
	const ABTestAPI = useAB();
	const adBlockerInUse = useAdBlockInUse();

	useOnce(() => {
		const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
		const pageViewId = window.guardian?.config?.ophan?.pageViewId;

		// Only send metrics if the switch is enabled
		if (!enabled) return;

		const testsToForceMetrics: ABTest[] = [
			/* keep array multi-line */
			spacefinderOkrMegaTest,
		];
		const shouldForceMetrics = ABTestAPI.allRunnableTests(tests).some(
			(test) => testsToForceMetrics.map((t) => t.id).includes(test.id),
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

		if (shouldForceMetrics) {
			// TODO: rename this in commercial-core and update here
			switchOffSampling();
		}
	}, [ABTestAPI, adBlockerInUse, enabled]);

	// We don’t render anything
	return null;
};

export const CommercialMetrics = ({
	enabled,
	switches,
	isSensitive,
	isDev,
}: Props) => (
	<WithABProvider
		abTestSwitches={switches}
		pageIsSensitive={isSensitive}
		isDev={!!isDev}
	>
		<CommercialMetricsWithAB enabled={enabled} />
	</WithABProvider>
);
