import type { ABTest } from '@guardian/ab-core';
import { tests } from '@frontend/web/experiments/ab-tests';
import { useEffect, useState } from 'react';
import { sendCommercialMetrics } from '@guardian/commercial-core';
import { useAB } from '@guardian/ab-react';
import { useDocumentVisibilityState } from '../lib/useDocumentHidden';
import { isAdBlockInUse } from '../lib/detectAdBlocker'

export const CommercialMetrics: React.FC<{
	pageViewId: string;
	browserId: string | undefined;
}> = ({ pageViewId, browserId }) => {
	const ABTestAPI = useAB();
	const visibilityState = useDocumentVisibilityState();

	const [sentCommercialMetrics, setSentCommercialMetrics] = useState<boolean>(
		false,
	);

	const [adBlockerInUse, setAdBlockerInUse] = useState<boolean>();

	isAdBlockInUse().then((value) => {
		console.log("value ",  value)
		setAdBlockerInUse(value);
	}).catch((error) => {
		console.log(error);
	});

	useEffect(() => {
		if (adBlockerInUse === undefined) return;
		console.log("visibilityState ", visibilityState)
		if (visibilityState !== 'hidden') return;
		if (sentCommercialMetrics) return;
		console.log("adBlockerInUse", adBlockerInUse)

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

		if (isDev || shouldForceMetrics || userIsInSamplingGroup)
			setSentCommercialMetrics(
				sendCommercialMetrics(
					pageViewId,
					browserId,
					Boolean(isDev),
					// adBlockerInUse,
				),
			);
	}, [
		ABTestAPI,
		pageViewId,
		browserId,
		visibilityState,
		sentCommercialMetrics,
		adBlockerInUse
	]);

	// We don’t render anything
	return null;
};
