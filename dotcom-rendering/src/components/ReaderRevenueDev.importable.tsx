import { useEffect } from 'react';
import type { ReaderRevenueDevUtils } from '../lib/readerRevenueDevUtils';

type Props = {
	shouldHideReaderRevenue: boolean;
};

export const ReaderRevenueDev = ({ shouldHideReaderRevenue }: Props) => {
	useEffect(() => {
		// Used internally only, so only import each function on demand
		const loadAndRun =
			<K extends keyof Omit<ReaderRevenueDevUtils, 'bannerToShow'>>(
				key: K,
			) =>
			(asExistingSupporter: boolean) =>
				import(
					/* webpackChunkName: "readerRevenueDevUtils" */ '../lib/readerRevenueDevUtils'
				)
					.then((utils) =>
						utils[key](
							asExistingSupporter,
							shouldHideReaderRevenue,
						),
					)

					.catch((error) =>
						console.log(
							'Error loading readerRevenueDevUtils',
							error,
						),
					);

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- window.guardian may be missing?
		if (window?.guardian) {
			window.guardian.readerRevenue = {
				changeGeolocation: loadAndRun('changeGeolocation'),
				showMeTheEpic: loadAndRun('showMeTheEpic'),
				showMeTheBanner: loadAndRun('showMeTheBanner'),
				showNextVariant: loadAndRun('showNextVariant'),
				showPreviousVariant: loadAndRun('showPreviousVariant'),
				bannerToShow: undefined,
			};
		}
	}, [shouldHideReaderRevenue]);

	return null;
};
