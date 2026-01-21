import type { Banner } from '@braze/web-sdk';
import { useEffect, useRef, useState } from 'react';
import type { CanShowResult } from '../messagePicker';
import type { BrazeBannersSystemPlacementId } from './buildBrazeMessaging';
import type { BrazeInstance } from './initialiseBraze';

/**
 * Meta information required to display a Braze Banner.
 */
export type BrazeBannersSystemMeta = {
	braze: BrazeInstance;
	banner: Banner;
};

/**
 * Checks if a Braze Banner for the given placement ID can be shown.
 * @param braze Braze instance
 * @param placementId Placement ID to check for a banner
 * @returns CanShowResult with the Banner meta if it can be shown
 */
export const canShowBrazeBannersSystem = async (
	braze: BrazeInstance | null,
	placementId: BrazeBannersSystemPlacementId,
): Promise<CanShowResult<BrazeBannersSystemMeta>> => {
	// First, check if Braze dependencies are satisfied
	if (!braze) {
		return { show: false };
	}

	/**
	 * NOTE: ℹ️
	 * If loading the banners for the first time, Braze requires some time to fetch them from their servers.
	 * Therefore, on the first load, there might be no banners available yet.
	 * Question for the relevant team: Should we implement a retry mechanism here to wait for the banners to be fetched?
	 * Or is it acceptable to not show any banners on the first load?
	 * We can implement a waiting mechanism with a timeout to avoid blocking the other candidates for too long.
	 * But should we? 🤔
	 */

	/**
	 * Banner for the placement ID.
	 * It is an object of type Banner, if a banner with the given placement ID exists.
	 * It is null if the banner does not exist, or if banners are disabled.
	 * It is undefined if the SDK has not been initialized.
	 */
	const banner: Banner | null | undefined = braze.getBanner(placementId);
	if (banner) {
		return {
			show: true,
			meta: {
				braze,
				banner,
			},
		};
	} else {
		return { show: false };
	}
};

/**
 * Displays a Braze Banner using the Braze Banners System.
 * @param meta Meta information required to display the banner
 * @returns React component that renders the Braze Banner
 */
export const BrazeBannersSystemDisplay = ({
	meta,
}: {
	meta: BrazeBannersSystemMeta;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [minHeight, setMinHeight] = useState<string>('0px');
	useEffect(() => {
		// Render the banner ONLY when we have both the Data and the DOM Element
		if (containerRef.current) {
			// Clear any existing content to prevent duplicates
			containerRef.current.innerHTML = '';

			// Returns the string property
			const metaMinHeight = meta.banner.getStringProperty('minHeight');
			if (metaMinHeight) {
				setMinHeight(metaMinHeight);
			}

			// Let Braze inject the HTML/CSS
			meta.braze.insertBanner(meta.banner, containerRef.current);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			ref={containerRef}
			className="braze-banner-container"
			style={{ minHeight }} // Optional: prevents layout shift
		/>
	);
};
