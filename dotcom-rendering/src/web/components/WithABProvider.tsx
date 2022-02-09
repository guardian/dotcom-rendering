import { useEffect } from 'react';
import { CoreAPIConfig } from '@guardian/ab-core/dist/types';
import { ABProvider, useAB } from '@guardian/ab-react';
import { getCookie, log } from '@guardian/libs';
import { tests } from '../experiments/ab-tests';
import { getOphanRecordFunction } from '../browser/ophan/ophan';
import { getCypressSwitches } from '../experiments/cypress-switches';
import { getForcedParticipationsFromUrl } from '../lib/getAbUrlHash';

type Props = {
	abTestSwitches: CoreAPIConfig['abTestSwitches'];
	pageIsSensitive: CoreAPIConfig['pageIsSensitive'];
	isDev: boolean;
	children: JSX.Element;
};

const InitialiseAB = ({ children }: { children: JSX.Element }) => {
	// *******************************
	// ** Setup AB Test Tracking *****
	// *******************************
	const ABTestAPI = useAB();
	useEffect(() => {
		const allRunnableTests = ABTestAPI.allRunnableTests(tests);
		ABTestAPI.trackABTests(allRunnableTests);
		ABTestAPI.registerImpressionEvents(allRunnableTests);
		ABTestAPI.registerCompleteEvents(allRunnableTests);
		log('dotcom', 'AB tests initialised');
	}, [ABTestAPI]);

	return children;
};

export const WithABProvider = ({
	abTestSwitches,
	pageIsSensitive,
	isDev,
	children,
}: Props) => {
	const mvtId = Number(
		(isDev &&
			getCookie({ name: 'GU_mvt_id_local', shouldMemoize: true })) || // Simplify localhost testing by creating a different mvt id
			getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
	);
	if (!mvtId) {
		// 0 is default and falsy here
		// eslint-disable-next-line no-console
		console.log('There is no MVT ID set, see WithABProvider.tsx');
	}
	const ophanRecord = getOphanRecordFunction();
	const windowHash = window?.location.hash;
	// Get the forced switches to use for when running within cypress
	// Is empty object if not in cypress
	const cypressAbSwitches = getCypressSwitches();
	return (
		<ABProvider
			arrayOfTestObjects={tests}
			abTestSwitches={{
				...abTestSwitches,
				...cypressAbSwitches, // by adding cypress switches below CAPI, we can override any production switch in Cypress
			}}
			pageIsSensitive={pageIsSensitive}
			mvtMaxValue={1000000}
			mvtId={mvtId}
			ophanRecord={ophanRecord}
			forcedTestVariants={getForcedParticipationsFromUrl(windowHash)}
		>
			<InitialiseAB>{children}</InitialiseAB>
		</ABProvider>
	);
};
