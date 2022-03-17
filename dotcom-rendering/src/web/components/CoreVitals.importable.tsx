import type { ABTest } from '@guardian/ab-core';
import { useAB } from '@guardian/ab-react';
import {
	bypassCoreWebVitalsSampling,
	getCookie,
	initCoreWebVitals,
} from '@guardian/libs';
import { tests } from '../experiments/ab-tests';
import { WithABProvider } from './WithABProvider';

const CoreVitalsWithAB = () => {
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;

	const isDev =
		window.location.hostname === 'm.code.dev-theguardian.com' ||
		window.location.hostname === (process.env.HOSTNAME || 'localhost') ||
		window.location.hostname === 'preview.gutools.co.uk';
	const sampling = 1 / 100;

	initCoreWebVitals({
		browserId,
		pageViewId,
		isDev,
		sampling,
		team: 'dotcom',
	});

	const testsToForceMetrics: ABTest[] = [
		/* keep array multi-line */
	];

	const ABTestAPI = useAB();
	const userInTestToForceMetrics = ABTestAPI.allRunnableTests(tests).some(
		(test) => testsToForceMetrics.map((t) => t.id).includes(test.id),
	);

	if (window.location.hostname === (process.env.HOSTNAME || 'localhost'))
		bypassCoreWebVitalsSampling('dotcom');
	else if (userInTestToForceMetrics)
		bypassCoreWebVitalsSampling('commercial');

	// don’t render anything
	return null;
};

type Props = {
	switches: Switches;
	isSensitive: boolean;
	isDev?: boolean;
};

export const CoreVitals = ({ switches, isSensitive, isDev }: Props) => (
	<WithABProvider
		abTestSwitches={switches}
		pageIsSensitive={isSensitive}
		isDev={!!isDev}
	>
		<CoreVitalsWithAB />
	</WithABProvider>
);
