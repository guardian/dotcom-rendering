import type { ABTest } from '@guardian/ab-core';
import { tests } from '@frontend/web/experiments/ab-tests';
import { sendCommercialMetrics } from '@guardian/commercial-core';
import { useOnce } from '@root/src/web/lib/useOnce';
import { useAB } from '@guardian/ab-react';
import { useDocumentVisibilityState } from '../lib/useDocumentHidden';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';

// TODO disallow undefined browserIds by placing conditional in App.tsx
// so that we wait to render this component until browserId is defined.
export const CommercialMetrics: React.FC<{
	pageViewId: string;
	browserId: string | undefined;
}> = ({ pageViewId, browserId }) => {
	const ABTestAPI = useAB();
	const visibilityState = useDocumentVisibilityState();

	const adBlockerInUse = useAdBlockInUse();
	const isHidden = visibilityState === 'hidden';

	useOnce(() => {
		const testsToForceMetrics: ABTest[] = [];
		const shouldForceMetrics = ABTestAPI.allRunnableTests(tests).some(
			(test) => testsToForceMetrics.map((t) => t.id).includes(test.id),
		);
		const userIsInSamplingGroup = Math.random() <= 1 / 100;
		const isDev =
			window.guardian.config.page.isDev ||
			window.location.hostname.includes('localhost');

		if (isDev || shouldForceMetrics || userIsInSamplingGroup) {
			const args: [string, string | undefined, boolean, boolean?] =
				adBlockerInUse === undefined
					? [pageViewId, browserId, Boolean(isDev)]
					: [pageViewId, browserId, Boolean(isDev), adBlockerInUse];
			sendCommercialMetrics(...args);
		}
	}, [
		ABTestAPI,
		pageViewId,
		adBlockerInUse,
		isHidden || undefined, // only send metrics when visibility state changes to hidden
	]);

	// We don’t render anything
	return null;
};
