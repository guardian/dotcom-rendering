import type { CoreAPIConfig } from '@guardian/ab-core';
import { AB } from '@guardian/ab-core';
import { getCookie, log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getOphan } from '../client/ophan/ophan';
import { tests } from '../experiments/ab-tests';
import { runnableTestsToParticipations } from '../experiments/lib/ab-participations';
import { getForcedParticipationsFromUrl } from '../lib/getAbUrlHash';
import { setABTests } from '../lib/useAB';
import type { ABTestSwitches } from '../model/enhance-switches';
import type { ServerSideTests } from '../types/config';
import { useConfig } from './ConfigContext';

type Props = {
	abTestSwitches: ABTestSwitches;
	forcedTestVariants?: CoreAPIConfig['forcedTestVariants'];
	isDev: boolean;
	pageIsSensitive: CoreAPIConfig['pageIsSensitive'];
	serverSideTests: ServerSideTests;
};

const mvtMinValue = 1;
const mvtMaxValue = 1_000_000;

/** Parse a valid MVT ID between 1 and 1,000,000 or undefined if it fails */
const parseMvtId = (id: string | null): number | undefined => {
	if (!id) return; // null or empty string
	const number = Number(id);
	if (Number.isNaN(number)) return;
	if (number < mvtMinValue) return;
	if (number > mvtMaxValue) return;
	return number;
};

const getMvtId = () =>
	parseMvtId(
		getCookie({
			name: 'GU_mvt_id',
			shouldMemoize: true,
		}),
	);

/** Check if there is a local override */
const getLocalMvtId = () =>
	parseMvtId(
		getCookie({
			name: 'GU_mvt_id_local',
			shouldMemoize: true,
		}),
	);

/**
 * Initialises the values of `useAB` and sends relevant Ophan events.
 *
 * ## Why does this need to be an Island?
 *
 * All this logic is client-side.
 *
 * ---
 *
 * Does not render **anything**.
 */
export const SetABTests = ({
	isDev,
	pageIsSensitive,
	abTestSwitches,
	forcedTestVariants,
	serverSideTests,
}: Props) => {
	const { renderingTarget } = useConfig();
	const [ophan, setOphan] = useState<Awaited<ReturnType<typeof getOphan>>>();

	useEffect(() => {
		getOphan(renderingTarget)
			.then(setOphan)
			.catch((e) => {
				console.log(
					`There was an error retrieving the ophan window object`,
					e,
				);
			});
	}, [renderingTarget]);

	useEffect(() => {
		if (!ophan) return;

		const mvtId = isDev ? getLocalMvtId() ?? getMvtId() : getMvtId();

		if (mvtId === undefined) {
			console.error(
				'There is no MVT ID set, see SetABTests.importable.tsx',
			);
		}

		const allForcedTestVariants = {
			...forcedTestVariants,
			...getForcedParticipationsFromUrl(window.location.hash),
		};

		const ab = new AB({
			mvtId: mvtId ?? -1,
			mvtMaxValue,
			pageIsSensitive,
			abTestSwitches,
			arrayOfTestObjects: tests,
			forcedTestVariants: allForcedTestVariants,
			ophanRecord: ophan.record,
			serverSideTests,
			errorReporter: (e) =>
				window.guardian.modules.sentry.reportError(
					e instanceof Error ? e : Error(String(e)),
					'ab-tests',
				),
		});
		const allRunnableTests = ab.allRunnableTests(tests);
		const participations = runnableTestsToParticipations(allRunnableTests);

		setABTests({
			api: ab,
			participations,
		});

		ab.trackABTests(allRunnableTests);
		ab.registerImpressionEvents(allRunnableTests);
		ab.registerCompleteEvents(allRunnableTests);
		log('dotcom', 'AB tests initialised');
	}, [
		abTestSwitches,
		forcedTestVariants,
		isDev,
		pageIsSensitive,
		ophan,
		serverSideTests,
	]);

	// we don’t render anything
	return null;
};
