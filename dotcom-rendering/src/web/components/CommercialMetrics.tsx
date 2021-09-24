import type { ABTest } from '@guardian/ab-core';
import { tests } from '@frontend/web/experiments/ab-tests';
import { useEffect, useState } from 'react';
import { sendCommercialMetrics } from '@guardian/commercial-core';
import { useAB } from '@guardian/ab-react';
import { useDocumentVisibilityState } from '../lib/useDocumentHidden';
import { useAdBlockInUse } from '../lib/useAdBlockInUse'

// TODO disallow undefined browserIds by placing conditional in App.tsx
// so that we wait to render this component until browserId is defined.
export const CommercialMetrics: React.FC<{
	pageViewId: string;
	browserId: string | undefined;
}> = ({ pageViewId, browserId }) => {
	const ABTestAPI = useAB();
	const visibilityState = useDocumentVisibilityState();

	const [sentCommercialMetrics, setSentCommercialMetrics] = useState<boolean>(
		false,
	);

	const adBlockerInUse = useAdBlockInUse()

	// TODO replace useEffect with useOnce, simplifying the below logic
	useEffect(() => {
		if (visibilityState !== 'hidden') return;
		if (sentCommercialMetrics) return;

		const testsToForceMetrics: ABTest[] = [];
		const shouldForceMetrics = ABTestAPI.allRunnableTests(
			tests,
		).some((test) =>
			testsToForceMetrics.map((t) => t.id).includes(test.id),
		);
		const userIsInSamplingGroup = Math.random() <= 1 / 100;
		const isDev =
			window.guardian.config.page.isDev ||
			window.location.hostname.includes('localhost');

		if (isDev || shouldForceMetrics || userIsInSamplingGroup) {
			const args: [string, string | undefined, boolean, boolean?] = adBlockerInUse === undefined
				? [pageViewId, browserId, Boolean(isDev)]
				: [pageViewId, browserId, Boolean(isDev), adBlockerInUse];
			setSentCommercialMetrics(
				sendCommercialMetrics(...args),
			);
		}
	}, [
		ABTestAPI,
		pageViewId,
		browserId,
		visibilityState,
		sentCommercialMetrics,
		adBlockerInUse,
	]);

	// We don’t render anything
	return null;
};
