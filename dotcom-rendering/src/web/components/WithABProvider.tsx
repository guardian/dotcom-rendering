import { CoreAPIConfig } from '@guardian/ab-core/dist/types';
import { ABProvider } from '@guardian/ab-react';
import { getCookie } from '@guardian/libs';
import { getOphanRecordFunction } from '../browser/ophan/ophan';
import { getCypressSwitches } from '../experiments/cypress-switches';
import { getForcedParticipationsFromUrl } from '../lib/getAbUrlHash';

type Props = {
	arrayOfTestObjects: CoreAPIConfig['arrayOfTestObjects'];
	abTestSwitches: CoreAPIConfig['abTestSwitches'];
	pageIsSensitive: CoreAPIConfig['pageIsSensitive'];
	isDev: boolean;
	children: JSX.Element;
};
export const WithABProvider = ({
	arrayOfTestObjects,
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
			arrayOfTestObjects={arrayOfTestObjects}
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
			{children}
		</ABProvider>
	);
};
