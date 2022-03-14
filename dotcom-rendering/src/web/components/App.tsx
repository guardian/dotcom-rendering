import { useEffect } from 'react';

import { log } from '@guardian/libs';

import { incrementAlreadyVisited } from '../lib/alreadyVisited';
import { ReaderRevenueDevUtils } from '../lib/readerRevenueDevUtils';

type Props = {
	CAPI: CAPIBrowserType;
};

let renderCount = 0;
export const App = ({ CAPI }: Props) => {
	log('dotcom', `App.tsx render #${(renderCount += 1)}`);

	useEffect(() => {
		incrementAlreadyVisited();
	}, []);

	useEffect(() => {
		// Used internally only, so only import each function on demand
		const loadAndRun =
			<K extends keyof ReaderRevenueDevUtils>(key: K) =>
			(asExistingSupporter: boolean) =>
				import(
					/* webpackChunkName: "readerRevenueDevUtils" */ '../lib/readerRevenueDevUtils'
				)
					.then((utils) =>
						utils[key](
							asExistingSupporter,
							CAPI.shouldHideReaderRevenue,
						),
					)
					/* eslint-disable no-console */
					.catch((error) =>
						console.log(
							'Error loading readerRevenueDevUtils',
							error,
						),
					);
		/* eslint-enable no-console */

		if (window && window.guardian) {
			window.guardian.readerRevenue = {
				changeGeolocation: loadAndRun('changeGeolocation'),
				showMeTheEpic: loadAndRun('showMeTheEpic'),
				showMeTheBanner: loadAndRun('showMeTheBanner'),
				showNextVariant: loadAndRun('showNextVariant'),
				showPreviousVariant: loadAndRun('showPreviousVariant'),
			};
		}
	}, [CAPI.shouldHideReaderRevenue]);

	return null;
};
