import { log } from '@guardian/libs';
import { useEffect, useMemo, useState } from 'react';
import { getOphan } from '../client/ophan/ophan';
import { ABTests } from '../experiments/lib/ab-tests';
import { isServer } from '../lib/isServer';
import { setABTests } from '../lib/useAB';
import type { EditorialAbTest } from '../types/front';
import { useConfig } from './ConfigContext';

type Props = {
	serverSideABTests: Record<string, string>;
	editorialAbTests?: EditorialAbTest[];
};

const errorReporter = (e: unknown) =>
	window.guardian.modules.sentry.reportError(
		e instanceof Error ? e : Error(String(e)),
		'ab-tests',
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
export const SetABTests = ({ serverSideABTests, editorialAbTests }: Props) => {
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

	const ab = useMemo(() => {
		const abTests = new ABTests(
			isServer
				? {
						editorialAbTests,
						serverSideABTests,
						isServer: true,
					}
				: { editorialAbTests, isServer: false },
		);
		setABTests(abTests);
		return abTests;
	}, [serverSideABTests, editorialAbTests]);

	useEffect(() => {
		if (!ophan) {
			return;
		}

		ab.trackABTests(ophan.record, errorReporter);

		log('dotcom', 'AB tests initialised');
	}, [ab, ophan]);

	// we don't render anything
	return null;
};
