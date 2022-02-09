import type { ABTest } from '@guardian/ab-core';
import { sendCommercialMetrics } from '@guardian/commercial-core';
import { getCookie } from '@guardian/libs';
import { useAB } from '@guardian/ab-react';
import { useOnce } from '../lib/useOnce';
import { tests } from '../experiments/ab-tests';
import { spacefinderOkr1FilterNearby } from '../experiments/tests/spacefinder-okr-1-filter-nearby';
import { useDocumentVisibilityState } from '../lib/useDocumentHidden';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';

// TODO disallow undefined browserIds by placing conditional in App.tsx
// so that we wait to render this component until browserId is defined.
export const CommercialMetrics: React.FC<{
	pageViewId: string;
}> = ({ pageViewId }) => {
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
