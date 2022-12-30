import { useEffect } from 'react';
import type { ReaderRevenueDevUtils } from '../lib/readerRevenueDevUtils';

type Props = {
	shouldHideReaderRevenue: boolean;
};

export const ReaderRevenueDev = ({ shouldHideReaderRevenue }: Props) => {
	useEffect(() => {
		// Used internally only, so only import each function on demand
		const loadAndRun =
			<K extends keyof ReaderRevenueDevUtils>(key: K) =>
			(asExistingSupporter: boolean) =>
				import(
					/* webpackChunkName: "readerRevenueDevUtils" */ '../lib/readerRevenueDevUtils'
				)
					.then((utils) =>
						utils[key](asExistingSupporter, shouldHideReaderRevenue),
					)

					.catch((error) =>
						console.log('Error loading readerRevenueDevUtils', error),
					);

		if (window && window.guardian) {
			window.guardian.readerRevenue = {
				changeGeolocation: loadAndRun('changeGeolocation'),
				showMeTheEpic: loadAndRun('showMeTheEpic'),
				showMeTheBanner: loadAndRun('showMeTheBanner'),
				showNextVariant: loadAndRun('showNextVariant'),
				showPreviousVariant: loadAndRun('showPreviousVariant'),
			};
		}
	}, [shouldHideReaderRevenue]);

	return null;
};
