import type { Banner } from '@braze/web-sdk';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TagType } from '../../types/tag';
import { getOptionsHeaders } from '../identity';
import type { CanShowResult } from '../messagePicker';
import { useAuthStatus } from '../useAuthStatus';
import type { BrazeInstance } from './initialiseBraze';
import { suppressForTaylorReport } from './taylorReport';

/**
 * Logger prefix for Braze Banners System logs.
 */
const LOG_PREFIX = '[BrazeBannersSystem]';

/**
 * List of development domains where Braze Banners System logs will be shown.
 */
const DEVELOPMENT_DOMAINS = ['localhost', 'r.thegulocal.com'];

/**
 * Checks if the current domain is a development domain.
 * @returns boolean indicating if the current domain is a development domain
 */
export const isDevelopmentDomain = (): boolean => {
	if (typeof window === 'undefined') return false; // Safety for SSR/Node environments
	return DEVELOPMENT_DOMAINS.includes(window.location.hostname);
};

/**
 * Logger for the Braze Banners System.
 */
export const brazeBannersSystemLogger = {
	log: (...args: any[]): void => {
		if (isDevelopmentDomain()) console.log(LOG_PREFIX, ...args);
	},
	info: (...args: any[]): void => {
		if (isDevelopmentDomain()) console.info(LOG_PREFIX, ...args);
	},
	warn: (...args: any[]): void => {
		if (isDevelopmentDomain()) console.warn(LOG_PREFIX, ...args);
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
	Banner = 'dotcom-rendering_banner',
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
	if (
		placementId === BrazeBannersSystemPlacementId.EndOfArticle &&
		contentType.toLowerCase() === 'interactive'
	) {
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
	GetSettingsPropertyValue = 'BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE',
	DismissBanner = 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER',
}

/**
 * Retrieves the value of a property from the Braze Banner meta.
 * @param meta Braze Banner meta information
 * @param propertyKey Key of the property to retrieve
 * @returns The value of the property as a string
 */
const getPropertyValueAsString = (
	meta: BrazeBannersSystemMeta,
	propertyKey: string,
): string => {
	if (meta.banner.properties[propertyKey]?.type === 'string') {
		return meta.banner.getStringProperty(propertyKey) ?? '';
	}
	if (meta.banner.properties[propertyKey]?.type === 'number') {
		return String(meta.banner.getNumberProperty(propertyKey));
	}
	if (meta.banner.properties[propertyKey]?.type === 'boolean') {
		return String(meta.banner.getBooleanProperty(propertyKey));
	}
	if (meta.banner.properties[propertyKey]?.type === 'image') {
		return meta.banner.getImageProperty(propertyKey) ?? '';
	}
	if (meta.banner.properties[propertyKey]?.type === 'jsonobject') {
		return JSON.stringify(meta.banner.getJsonProperty(propertyKey));
	}
	if (meta.banner.properties[propertyKey]?.type === 'datetime') {
		return new Date(
			meta.banner.getTimestampProperty(propertyKey) ?? 0,
		).toISOString();
	}
	return '';
};

/**
 * Runs a CSS checker on the Braze Banner to ensure that all custom styles
 * selectors are selecting existent elements.
 * This is important because since Braze does not allow personalization of CSS,
 * any CSS rules that do not match any elements are likely caused by Braze
 * changing there rendering engine without notice. This could lead to broken
 * styles on the banners and a bad user experience.
 * @param meta Braze Banner meta information
 * @param stopOnFirstProblem Whether to stop checking on the first problem found
 * @returns boolean indicating if the CSS passed the checks
 */
const runCssCheckerOnBrazeBanner = (
	meta: BrazeBannersSystemMeta,
	stopOnFirstProblem?: boolean,
): boolean => {
	let isValid = true;
	const parser = new DOMParser();
	const document = parser.parseFromString(meta.banner.html, 'text/html');

	// Target specifically the .bz-banner container
	const bzContainer = document.querySelector('.bz-banner');

	// If the container doesn't exist, we can't find nested styles
	if (!bzContainer) {
		brazeBannersSystemLogger.warn(
			'CSS Checker: .bz-banner container not found in HTML.',
		);
		return false;
	}

	// Helper to check a list of rules (allows recursion)
	const styleElements = bzContainer.querySelectorAll('style');
	const checkRules = (rules: CSSRuleList): boolean => {
		for (let i = 0; i < rules.length; i++) {
			const rule = rules[i];

			if (rule instanceof CSSStyleRule) {
				const selector = rule.selectorText;
				const matchedElements = document.querySelectorAll(selector);

				if (matchedElements.length === 0) {
					brazeBannersSystemLogger.warn(
						`CSS Checker: Selector "${selector}" did not match any elements. This may indicate broken styles in the Braze Banner. Check UI/UX ASAP!`,
					);
					isValid = false;
					if (stopOnFirstProblem) return false;
				}
			}
			// Check if the rule is a group (like @media or @supports)
			else if (
				rule instanceof CSSGroupingRule ||
				(rule as any).cssRules
			) {
				const nestedRules = (rule as CSSGroupingRule).cssRules;
				if (!checkRules(nestedRules) && stopOnFirstProblem)
					return false;
			}
		}
		return true;
	};

	for (const styleElement of styleElements) {
		if (styleElement.sheet) {
			if (
				!checkRules(styleElement.sheet.cssRules) &&
				stopOnFirstProblem
			) {
				return false;
			}
		}
	}

	return isValid;
};

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
		if (containerRef.current && meta.braze && meta.banner) {
			// Clear any existing content to prevent duplicates
			containerRef.current.innerHTML = '';

			// Returns the string property
			const metaMinHeight = meta.banner.getStringProperty('minHeight');
			if (metaMinHeight) {
				setMinHeight(metaMinHeight);
			}

			// Let Braze inject the HTML/CSS
			meta.braze.insertBanner(meta.banner, containerRef.current);

			// CSS Checker
			runCssCheckerOnBrazeBanner(meta);
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
				| {
						type: BrazeBannersSystemMessageType.GetSettingsPropertyValue;
						key?: string;
				  }
				| {
						type: BrazeBannersSystemMessageType.DismissBanner;
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
				case BrazeBannersSystemMessageType.GetSettingsPropertyValue:
					const { key } = event.data;
					if (key) {
						const value = getPropertyValueAsString(meta, key);
						postMessageToBrazeBanner(
							BrazeBannersSystemMessageType.GetSettingsPropertyValue,
							{
								key,
								value,
							},
						);
					}
					break;
				case BrazeBannersSystemMessageType.DismissBanner:
					// Remove the banner from the DOM
					if (containerRef.current) {
						containerRef.current.innerHTML = '';
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
