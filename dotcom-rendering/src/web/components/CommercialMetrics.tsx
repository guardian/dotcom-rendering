import type { ABTest } from '@guardian/ab-core';
import { tests } from '@frontend/web/experiments/ab-tests';
import { sendCommercialMetrics } from '@guardian/commercial-core';
import { useOnce } from '@root/src/web/lib/useOnce';
import { getCookie } from '@guardian/libs';
import { useAB } from '@guardian/ab-react';
import { spacefinderOkr1FilterNearby } from '@frontend/web/experiments/tests/spacefinder-okr-1-filter-nearby';
import { useDocumentVisibilityState } from '../lib/useDocumentHidden';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';

export const CommercialMetrics = () => {
	const pageViewId = window.guardian?.config?.ophan?.pageViewId;
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const ABTestAPI = useAB();
	const visibilityState = useDocumentVisibilityState();

	const adBlockerInUse = useAdBlockInUse();
	// only send metrics when visibility state changes to hidden;
	const isHidden = visibilityState === 'hidden' || undefined;

	useOnce(() => {
		const testsToForceMetrics: ABTest[] = [
			/* keep array multi-line */
			spacefinderOkr1FilterNearby,
		];
		const shouldForceMetrics = ABTestAPI.allRunnableTests(tests).some(
			(test) => testsToForceMetrics.map((t) => t.id).includes(test.id),
		);
		const userIsInSamplingGroup = Math.random() <= 1 / 100;
		const isDev =
			window.guardian.config.page.isDev ||
			window.location.hostname.includes('localhost');

		if (isDev || shouldForceMetrics || userIsInSamplingGroup) {
			sendCommercialMetrics(
				pageViewId,
				browserId || undefined,
				isDev,
				adBlockerInUse,
			);
			// TODO: capture CWV also, to ensure commercial performance
			// doesn’t come at the expense of user experience.
			// See https://git.io/JP68Q in `frontend`
		}
	}, [ABTestAPI, pageViewId, adBlockerInUse, isHidden]);

	// We don’t render anything
	return null;
};
