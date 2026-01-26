import type { Banner } from '@braze/web-sdk';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getOptionsHeaders } from '../identity';
import type { CanShowResult } from '../messagePicker';
import { useAuthStatus } from '../useAuthStatus';
import type { BrazeInstance } from './initialiseBraze';
import { suppressForTaylorReport } from './taylorReport';
import { TagType } from '../../types/tag';

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
 * @param contentType Content type of the article
 * @param shouldHideReaderRevenue Whether to hide reader revenue components
 * @param tags Tags associated with the article
 * @returns CanShowResult with the Banner meta if it can be shown
 */
export const canShowBrazeBannersSystem = async (
	braze: BrazeInstance | null,
	placementId: BrazeBannersSystemPlacementId,
	contentType: string,
	shouldHideReaderRevenue: boolean,
	tags: TagType[],
): Promise<CanShowResult<BrazeBannersSystemMeta>> => {
	// First, check if Braze dependencies are satisfied
	if (!braze) {
		return { show: false };
	}

	// Do not show banners on Interactive articles
	if (contentType.toLowerCase() === 'interactive') {
		return { show: false };
	}

	/**
	 * Prevent Reader Revenue messaging from appearing on specific pages.
	 * This is typically used for:
	 * - Paid content (Advertisements)
	 * - Sensitive content
	 * - Pages where asking for money is deemed inappropriate or disabled by editorial tools.
	 */
	if (shouldHideReaderRevenue) {
		return { show: false };
	}

	/**
	 * When the brazeTaylorReport switch is enabled, this logic restricts the Braze Epic
	 * so that it only appears on articles in the "Cotton Capital" series.
	 */
	if (suppressForTaylorReport(tags)) {
		return { show: false };
	}

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
 * Types of messages that can be sent from the Braze Banner iframe.
 */
enum BrazeBannersSystemMessageType {
	GetAuthStatus = 'BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS',
	NewsletterSubscribe = 'BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE',
}

/**
 * Displays a Braze Banner using the Braze Banners System.
 * @param meta Meta information required to display the banner
 * @param idApiUrl Identity API URL for newsletter subscriptions
 * @returns React component that renders the Braze Banner
 */
export const BrazeBannersSystemDisplay = ({
	meta,
	idApiUrl,
}: {
	meta: BrazeBannersSystemMeta;
	idApiUrl: string;
}) => {
	const authStatus = useAuthStatus();
	const containerRef = useRef<HTMLDivElement>(null);
	const [minHeight, setMinHeight] = useState<string>('0px');

	const postMessageToBrazeBanner = (
		type: BrazeBannersSystemMessageType,
		customData: Record<string, any>,
	) => {
		if (containerRef.current) {
			const iframe = containerRef.current.querySelector('iframe');
			if (iframe?.contentWindow) {
				const data = {
					...customData,
					type: `${type}:RESPONSE`,
				};
				brazeBannersSystemLogger.log(
					'📤 Sent message to Braze Banner:',
					data,
				);
				iframe.contentWindow.postMessage(data, window.location.origin);
			}
		}
	};

	const subscribeToNewsletter = useCallback(
		async (newsletterId: string) => {
			if (authStatus.kind == 'SignedIn') {
				const options = getOptionsHeaders(authStatus);

				await fetch(`${idApiUrl}/users/me/newsletters`, {
					method: 'PATCH',
					body: JSON.stringify({
						id: newsletterId,
						subscribed: true,
					}),
					...options,
				})
					.catch((error) => {
						brazeBannersSystemLogger.warn(
							'Error subscribing to newsletter:',
							error,
						);
					})
					.then(() => {
						brazeBannersSystemLogger.info(
							'Successfully subscribed to newsletter:',
							newsletterId,
						);
					});
			}
		},
		[authStatus, idApiUrl],
	);

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

			// Replace Settings Placeholders
			const getPropertyValue = (propertyKey: string): string => {
				if (meta.banner.properties[propertyKey]?.type === 'string') {
					return meta.banner.properties[propertyKey]?.value;
				}
				if (meta.banner.properties[propertyKey]?.type === 'number') {
					return String(meta.banner.properties[propertyKey]?.value);
				}
				if (meta.banner.properties[propertyKey]?.type === 'boolean') {
					return String(meta.banner.properties[propertyKey]?.value);
				}
				if (meta.banner.properties[propertyKey]?.type === 'image') {
					return meta.banner.properties[propertyKey]?.value;
				}
				if (
					meta.banner.properties[propertyKey]?.type === 'jsonobject'
				) {
					return JSON.stringify(
						meta.banner.properties[propertyKey]?.value,
						null,
						2,
					);
				}
				if (meta.banner.properties[propertyKey]?.type === 'datetime') {
					return new Date(
						meta.banner.properties[propertyKey]?.value,
					).toISOString();
				}
				return '';
			};
			Object.keys(meta.banner.properties).forEach((propertyKey) => {
				meta.banner.html = meta.banner.html.replaceAll(
					`{{settings.${propertyKey}}}`,
					getPropertyValue(propertyKey),
				);
			});

			// Let Braze inject the HTML/CSS
			meta.braze.insertBanner(meta.banner, containerRef.current);
		}
	}, [meta.banner, meta.braze]);

	// Handle "postMessage" from the Banner's Buttons
	useEffect(() => {
		const handleBrazeBannerMessage = (
			event: MessageEvent<
				| {
						type: BrazeBannersSystemMessageType.GetAuthStatus;
				  }
				| {
						type: BrazeBannersSystemMessageType.NewsletterSubscribe;
						newsletterId?: string;
				  }
			>,
		) => {
			if (
				Object.values(BrazeBannersSystemMessageType).includes(
					event.data?.type,
				)
			) {
				brazeBannersSystemLogger.log(
					'📥 Received message from Braze Banner:',
					event.data,
				);
			}
			switch (event.data?.type) {
				case BrazeBannersSystemMessageType.GetAuthStatus:
					postMessageToBrazeBanner(
						BrazeBannersSystemMessageType.GetAuthStatus,
						{
							kind: authStatus.kind,
						},
					);
					break;
				case BrazeBannersSystemMessageType.NewsletterSubscribe:
					const { newsletterId } = event.data;
					if (newsletterId) {
						void subscribeToNewsletter(newsletterId);
					}
					break;
			}
		};

		window.addEventListener('message', handleBrazeBannerMessage);
		return () => {
			window.removeEventListener('message', handleBrazeBannerMessage);
		};
	}, [meta.banner, authStatus.kind, subscribeToNewsletter]);

	return (
		<div
			ref={containerRef}
			className="braze-banner-container"
			style={{ minHeight }} // Optional: prevents layout shift
		/>
	);
};
