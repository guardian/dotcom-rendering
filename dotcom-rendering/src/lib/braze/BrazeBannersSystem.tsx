import type { Banner } from '@braze/web-sdk';
import { useEffect, useRef, useState } from 'react';
import type { CanShowResult } from '../messagePicker';
import type { BrazeInstance } from './initialiseBraze';

/**
 * Logger prefix for Braze Banners System logs.
 */
const LOG_PREFIX = '[BrazeBannersSystem]';

/**
 * List of debug domains where Braze Banners System logs will be shown.
 */
const DEBUG_DOMAINS = ['localhost', 'r.thegulocal.com'];

/**
 * Checks if the current domain is a debug domain.
 * @returns boolean indicating if the current domain is a debug domain
 */
export const isDebugDomain = (): boolean => {
	if (typeof window === 'undefined') return false; // Safety for SSR/Node environments
	return DEBUG_DOMAINS.includes(window.location.hostname);
};

/**
 * Logger for the Braze Banners System.
 */
export const brazeBannersSystemLogger = {
	log: (...args: any[]): void => {
		if (isDebugDomain()) console.log(LOG_PREFIX, ...args);
	},
	info: (...args: any[]): void => {
		if (isDebugDomain()) console.info(LOG_PREFIX, ...args);
	},
	warn: (...args: any[]): void => {
		if (isDebugDomain()) console.warn(LOG_PREFIX, ...args);
	},
	error: (...args: any[]): void => {
		// Even for errors, we add the prefix so we know where it came from
		console.error(LOG_PREFIX, ...args);
	},
};

/**
 * Braze Banners System Placement IDs used in DCR
 */
export enum BrazeBannersSystemPlacementId {
	EndOfArticle = 'dotcom-rendering_end-of-article',
}

/**
 * Trigger a refresh of Braze Banners System banners
 * "Each call to requestBannersRefresh consumes one token. If you attempt a refresh
 * when no tokens are available, the SDK doesn’t make the request and logs an error
 * until a token refills. This is important for mid-session and event-triggered
 * updates. To implement dynamic updates (for example, after a user completes an
 * action on the same page), call the refresh method after the custom event is
 * logged, but note the necessary delay for Braze to ingest and process the event
 * before the user qualifies for a different Banner campaign."
 * https://www.braze.com/docs/developer_guide/banners/#rate-limiting-for-refresh-requests
 * @param braze The Braze instance
 * @returns A promise that resolves when the refresh is complete
 */
export function refreshBanners(braze: BrazeInstance): Promise<void> {
	let timeoutId: NodeJS.Timeout;

	// Create the Timeout Promise
	const timeout = new Promise<void>((resolve) => {
		timeoutId = setTimeout(() => {
			brazeBannersSystemLogger.warn(
				'⏱️ Refresh timed out. Proceeding anyway...',
			);
			// We can't cancel the Braze network request,
			// but we can ensure we stop waiting for it.
			resolve();
		}, 2000);
	});

	// Create the Braze Promise
	const brazeRequest = new Promise<void>((resolve) => {
		braze.requestBannersRefresh(
			Object.values(BrazeBannersSystemPlacementId),
			() => {
				brazeBannersSystemLogger.info('✅ Refresh completed.');
				clearTimeout(timeoutId); // Cancel the timeout
				resolve();
			},
			() => {
				brazeBannersSystemLogger.warn('⚠️ Refresh failed.');
				clearTimeout(timeoutId); // Cancel the timeout
				resolve();
			},
		);
	});

	// Race them
	return Promise.race([brazeRequest, timeout]);
}

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

	// Handle DOM Insertion
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
	}, [meta.banner, meta.braze]);

	// Handle "postMessage" from the Banner's Buttons
	useEffect(() => {
		const handleBrazeBannerMessage = (
			event: MessageEvent<{
				type: 'NEWSLETTER_SUBSCRIBE';
			}>,
		) => {
			if (event.data?.type === 'NEWSLETTER_SUBSCRIBE') {
				brazeBannersSystemLogger.log(
					'Subscribed user to newsletter:',
					event.data,
				);
				// const { newsletterId } = event.data;
				// subscribeUserToNewsletter(newsletterId);
			}
		};

		window.addEventListener('message', handleBrazeBannerMessage);

		// Cleanup listener on unmount
		return () =>
			window.removeEventListener('message', handleBrazeBannerMessage);
	}, [meta.banner]);

	return (
		<div
			ref={containerRef}
			className="braze-banner-container"
			style={{ minHeight }} // Optional: prevents layout shift
		/>
	);
};
