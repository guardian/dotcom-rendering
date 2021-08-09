import type { ABTest } from '@guardian/ab-core';
import { tests } from '@frontend/web/experiments/ab-tests';
import { useEffect, useState } from 'react';
import { sendCommercialMetrics } from '@guardian/commercial-core';
import { useAB } from '@guardian/ab-react';
import { commercialPartner } from '../experiments/tests/commercial-partner';
import { useDocumentVisibilityState } from '../lib/useDocumentHidden';

export const CommercialMetrics: React.FC<{
	pageViewId: string;
	browserId: string | undefined;
}> = ({ pageViewId, browserId }) => {
	const ABTestAPI = useAB();
	const visibilityState = useDocumentVisibilityState();

	const [sentCommercialMetrics, setSentCommercialMetrics] = useState<boolean>(
		false,
	);

	useEffect(() => {
		if (visibilityState !== 'hidden') return;
		if (sentCommercialMetrics) return;

		const testsToForceMetrics: ABTest[] = [commercialPartner];
		const shouldForceMetrics = ABTestAPI.allRunnableTests(
			tests,
		).some((test) =>
			testsToForceMetrics.map((t) => t.id).includes(test.id),
		);
		const userIsInSamplingGroup = Math.random() <= 1 / 100;
		const isDev =
			window.guardian.config.page.isDev ||
			window.location.hostname.includes('localhost');

		if (isDev || shouldForceMetrics || userIsInSamplingGroup)
			setSentCommercialMetrics(
				sendCommercialMetrics(pageViewId, browserId, Boolean(isDev)),
			);
	}, [
		ABTestAPI,
		pageViewId,
		browserId,
		visibilityState,
		sentCommercialMetrics,
	]);

	// We don’t render anything
	return null;
};
