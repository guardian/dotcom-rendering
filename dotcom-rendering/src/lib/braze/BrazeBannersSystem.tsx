import type { Banner } from '@braze/web-sdk';
import { css } from '@emotion/react';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import type {
	OneOffSignupRequest,
	ReminderComponent,
} from '@guardian/support-dotcom-components/dist/shared/types/reminders';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TagType } from '../../types/tag';
import { getAuthState, getOptionsHeaders } from '../identity';
import type { CanShowResult } from '../messagePicker';
import { useAuthStatus } from '../useAuthStatus';
import type { BrazeInstance } from './initialiseBraze';
import { suppressForTaylorReport } from './taylorReport';

/**
 * Determines the best mix color (black or white)
 * based on a given background hex color.
 */
export function getContrastMix(hexColor: string): 'black' | 'white' {
	// Remove the hash if it exists
	const hex = hexColor.replace('#', '');

	// Convert hex to RGB
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Calculate Relative Luminance
	// Standard formula for perceived brightness
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	// If brightness is > 128, the color is light (return black),
	// else it's dark (return white)
	return brightness > 128 ? 'black' : 'white';
}

/**
 * Determines the best accessible text color (black or white)
 * based on a given background hex color.
 */
export function getContrastColor(hexColor: string): '#000000' | '#ffffff' {
	return getContrastMix(hexColor) === 'black' ? '#000000' : '#ffffff';
}

/**
 * Logger prefix for Braze Banners System logs.
 */
const LOG_PREFIX = '[BrazeBannersSystem]';

/**
 * List of development domains where Braze Banners System logs will be shown.
 */
const DEVELOPMENT_DOMAINS = [
	'localhost',
	'r.thegulocal.com',
	'code.dev-theguardian.com',
	'm.code.dev-theguardian.com',
];

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
		brazeBannersSystemLogger.info(
			'Braze instance not available. Cannot show banner.',
		);
		return { show: false };
	}

	// Do not show banners on Interactive articles
	if (
		placementId === BrazeBannersSystemPlacementId.EndOfArticle &&
		contentType.toLowerCase() === 'interactive'
	) {
		brazeBannersSystemLogger.info(
			'Content type is Interactive. Not showing banner.',
		);
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
		brazeBannersSystemLogger.info(
			'Reader Revenue messaging is hidden for this user. Not showing banner.',
		);
		return { show: false };
	}

	/**
	 * When the brazeTaylorReport switch is enabled, this logic restricts the Braze Epic
	 * so that it only appears on articles in the "Cotton Capital" series.
	 */
	if (suppressForTaylorReport(tags)) {
		brazeBannersSystemLogger.info(
			'Article is part of the Taylor Report series. Not showing banner.',
		);
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
		brazeBannersSystemLogger.info(
			`Banner found for placement ID "${placementId}". Showing banner.`,
		);
		return {
			show: true,
			meta: {
				braze,
				banner,
			},
		};
	} else {
		brazeBannersSystemLogger.info(
			`No banner found for placement ID "${placementId}". Not showing banner.`,
		);
		return { show: false };
	}
};

/**
 * Types of messages that can be sent from the Braze Banner iframe.
 */
enum BrazeBannersSystemMessageType {
	GetAuthStatus = 'BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS',
	GetEmailAddress = 'BRAZE_BANNERS_SYSTEM:GET_EMAIL_ADDRESS',
	NewsletterSubscribe = 'BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE',
	ReminderSubscribe = 'BRAZE_BANNERS_SYSTEM:REMINDER_SUBSCRIBE',
	GetAllSettingsPropertyValues = 'BRAZE_BANNERS_SYSTEM:GET_ALL_SETTINGS_PROPERTY_VALUES',
	GetSettingsPropertyValue = 'BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE',
	NavigateToUrl = 'BRAZE_BANNERS_SYSTEM:NAVIGATE_TO_URL',
	DismissBanner = 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER',
}

/**
 * Retrieves the value of a property setting from the Braze Banner meta.
 * @param meta Braze Banner meta information
 * @param propertyKey Key of the property to retrieve
 * @returns The value of the property as a string
 */
const getSettingsPropertyValueAsString = (
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
 * Retrieves all property settings from the Braze Banner meta as strings.
 * @param meta Braze Banner meta information
 * @returns An object containing all property keys and their values as strings
 */
const getAllSettingsPropertiesValuesAsString = (
	meta: BrazeBannersSystemMeta,
): Record<string, string> => {
	const properties = meta.banner.properties;
	const result: Record<string, string> = {};
	for (const key in properties) {
		result[key] = getSettingsPropertyValueAsString(meta, key);
	}
	return result;
};

/**
 * Runs a CSS checker on the Braze Banner to ensure that all custom styles
 * selectors are selecting existent elements.
 * This is important because since Braze does not allow personalization of CSS,
 * any CSS rules that do not match any elements are likely caused by Braze
 * changing their rendering engine without notice. This could lead to broken
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
					if (stopOnFirstProblem) {
						return false;
					}
				}
			}
			// Check if the rule is a group (like @media or @supports)
			else if (
				rule instanceof CSSGroupingRule ||
				// Fallback check for group rules
				(rule && 'cssRules' in rule && rule.cssRules)
			) {
				const nestedRules = (rule as CSSGroupingRule).cssRules;
				if (!checkRules(nestedRules) && stopOnFirstProblem) {
					return false;
				}
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
	const [showBanner, setShowBanner] = useState(true);
	const [minHeight, setMinHeight] = useState<string>('0px');
	const [wrapperModeEnabled, setWrapperModeEnabled] =
		useState<boolean>(false);
	const [wrapperModeBackgroundColor, setWrapperModeBackgroundColor] =
		useState<string>('#ffffff');
	const [wrapperModeForegroundColor, setWrapperModeForegroundColor] =
		useState<string>('#000000');

	/**
	 * Subscribes the user to a newsletter via the Identity API.
	 * Only attempts to subscribe if the user is signed in and a newsletter ID is provided.
	 * @param newsletterId The ID of the newsletter to subscribe to
	 * @returns A promise that resolves to true if the subscription was successful, or false if it failed or the user is not signed in
	 */
	const subscribeToNewsletter = useCallback(
		async (newsletterId: string): Promise<boolean> => {
			if (authStatus.kind === 'SignedIn') {
				const options = getOptionsHeaders(authStatus);

				try {
					await fetch(`${idApiUrl}/users/me/newsletters`, {
						method: 'PATCH',
						body: JSON.stringify({
							id: newsletterId,
							subscribed: true,
						}),
						...options,
					});

					brazeBannersSystemLogger.info(
						'Successfully subscribed to newsletter:',
						newsletterId,
					);

					return true;
				} catch (error) {
					brazeBannersSystemLogger.warn(
						'Error subscribing to newsletter:',
						error,
					);
				}
			}
			return false;
		},
		[authStatus, idApiUrl],
	);

	/**
	 * Fetches the user's email address with a timeout to prevent hanging if the request takes too long.
	 * This is used to provide the email to the Braze Banner for personalization, but we don't want to wait indefinitely for it.
	 * @returns A promise that resolves to the user's email address or null if it couldn't be fetched in time
	 */
	const fetchEmail = useCallback(async (): Promise<string | null> => {
		const getEmail = async (): Promise<string | undefined> => {
			const authState = await getAuthState();
			return authState.idToken?.claims.email;
		};
		const timeoutPromise = new Promise<string | null>((resolve) => {
			setTimeout(() => resolve(null), 1000);
		});
		const result = await Promise.race<string | undefined | null>([
			getEmail(),
			timeoutPromise,
		]);
		return result ?? null;
	}, []);

	/**
	 * Create a one-off reminder for contribution
	 * @param reminderPeriod Date in YYYY-MM-DD format
	 * @param reminderComponent The component that is requesting the reminder (e.g., 'BANNER')
	 * @param reminderOption Specific reminder option (e.g., "recurring-contribution-upsell")
	 * @returns Promise that resolves to true if successful, false if failed
	 */
	const createReminder = useCallback(
		async (
			reminderPeriod: string,
			reminderComponent: ReminderComponent,
			reminderOption?: string,
		): Promise<boolean> => {
			try {
				const email = await fetchEmail();
				if (!email) {
					brazeBannersSystemLogger.warn(
						'Cannot create reminder: email address could not be fetched.',
					);
					return false;
				}

				const reminderSignupData: OneOffSignupRequest = {
					reminderPeriod,
					email,
					reminderPlatform: 'WEB',
					reminderComponent,
					reminderStage: 'PRE',
					country: undefined,
					reminderOption,
				};

				const response = await fetch(
					'https://support.theguardian.com/reminders/create/one-off',
					{
						body: JSON.stringify(reminderSignupData),
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);

				if (!response.ok) {
					console.error(
						'Failed to create reminder:',
						response.status,
						response.statusText,
					);
					return false;
				}

				return true;
			} catch (error) {
				console.error('Error creating reminder:', error);
				return false;
			}
		},
		[fetchEmail],
	);

	/**
	 * Dismisses the banner by setting the showBanner state to false, which will remove it from the DOM.
	 */
	const dismissBanner = useCallback(() => {
		setShowBanner(false);
	}, []);

	/**
	 * Sets the background and foreground colors for wrapper mode based on a given background color.
	 * @param backgroundColor The background color to use for the wrapper, which will also determine the foreground color for text and other elements to ensure sufficient contrast and accessibility.
	 */
	const setWrapperModeColors = useCallback((backgroundColor: string) => {
		setWrapperModeBackgroundColor(backgroundColor);
		setWrapperModeForegroundColor(getContrastColor(backgroundColor));
	}, []);

	/**
	 * Posts a message to the Braze Banner iframe with the given type and custom data.
	 * @param type The type of message being sent, which should correspond to one of the BrazeBannersSystemMessageType values. This indicates the purpose of the message (e.g., requesting auth status, subscribing to a newsletter, etc.) and will be used by the banner to determine how to handle the message and what response to send back.
	 * @param customData An object containing any additional data that should be sent along with the message. This can include information such as newsletter IDs, reminder periods, or any other relevant details needed for the banner to process the request and respond appropriately.
	 */
	const postMessageToBrazeBanner = useCallback(
		(
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
					iframe.contentWindow.postMessage(
						data,
						window.location.origin,
					);
				}
			}
		},
		[],
	);

	// Handle DOM Insertion
	useEffect(() => {
		// Render the banner ONLY when we have both the Data and the DOM Element
		if (showBanner && containerRef.current) {
			// Clear any existing content to prevent duplicates
			containerRef.current.innerHTML = '';

			// Check for minHeight property to prevent layout shifts, if it exists
			const metaMinHeight = meta.banner.getStringProperty('minHeight');
			if (metaMinHeight) {
				setMinHeight(metaMinHeight);
			}

			// Check for wrapperModeEnabled property to determine if we should apply wrapper styles
			const metaWrapperModeEnabled =
				meta.banner.getBooleanProperty('wrapperModeEnabled');
			if (
				metaWrapperModeEnabled !== undefined &&
				metaWrapperModeEnabled !== null
			) {
				setWrapperModeEnabled(metaWrapperModeEnabled);
			}

			// Check for wrapperModeBackgroundColor property to set the background color of the wrapper
			const metaWrapperModeBackgroundColor =
				meta.banner.getStringProperty('wrapperModeBackgroundColor');
			if (metaWrapperModeBackgroundColor) {
				setWrapperModeColors(metaWrapperModeBackgroundColor);
			}

			// Let Braze inject the HTML/CSS
			meta.braze.insertBanner(meta.banner, containerRef.current);

			// CSS Checker
			runCssCheckerOnBrazeBanner(meta);
		}
	}, [showBanner, meta, meta.banner, meta.braze, setWrapperModeColors]);

	// Handle "postMessage" from the Banner's Buttons
	useEffect(() => {
		const handleBrazeBannerMessage = (
			event: MessageEvent<
				| {
						type: BrazeBannersSystemMessageType.GetAuthStatus;
				  }
				| {
						type: BrazeBannersSystemMessageType.GetEmailAddress;
				  }
				| {
						type: BrazeBannersSystemMessageType.NewsletterSubscribe;
						newsletterId?: string;
				  }
				| {
						type: BrazeBannersSystemMessageType.ReminderSubscribe;
						reminderPeriod?: string;
						reminderComponent?: ReminderComponent;
						reminderOption?: string;
				  }
				| {
						type: BrazeBannersSystemMessageType.GetAllSettingsPropertyValues;
				  }
				| {
						type: BrazeBannersSystemMessageType.GetSettingsPropertyValue;
						key?: string;
				  }
				| {
						type: BrazeBannersSystemMessageType.NavigateToUrl;
						url?: string;
						target?: 'blank' | 'self';
				  }
				| {
						type: BrazeBannersSystemMessageType.DismissBanner;
				  }
			>,
		) => {
			if (
				event.origin === window.location.origin &&
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
				case BrazeBannersSystemMessageType.GetEmailAddress:
					void fetchEmail().then((email) => {
						postMessageToBrazeBanner(
							BrazeBannersSystemMessageType.GetEmailAddress,
							{
								email,
							},
						);
					});
					break;
				case BrazeBannersSystemMessageType.NewsletterSubscribe:
					const { newsletterId } = event.data;
					if (newsletterId) {
						void subscribeToNewsletter(newsletterId).then(
							(success) => {
								postMessageToBrazeBanner(
									BrazeBannersSystemMessageType.NewsletterSubscribe,
									{
										success,
									},
								);
							},
						);
					}
					break;
				case BrazeBannersSystemMessageType.ReminderSubscribe:
					const {
						reminderPeriod,
						reminderComponent,
						reminderOption,
					} = event.data;
					if (reminderPeriod) {
						void createReminder(
							reminderPeriod,
							reminderComponent ?? 'BANNER',
							reminderOption ?? 'recurring-contribution-upsell',
						).then((success) => {
							postMessageToBrazeBanner(
								BrazeBannersSystemMessageType.ReminderSubscribe,
								{
									success,
								},
							);
						});
					}
					break;
				case BrazeBannersSystemMessageType.GetAllSettingsPropertyValues:
					postMessageToBrazeBanner(
						BrazeBannersSystemMessageType.GetAllSettingsPropertyValues,
						getAllSettingsPropertiesValuesAsString(meta),
					);
					break;
				case BrazeBannersSystemMessageType.NavigateToUrl:
					const { url, target } = event.data;
					if (url) {
						if (target === 'blank') {
							window.open(url, '_blank');
						} else {
							window.location.href = url;
						}
					}
					break;
				case BrazeBannersSystemMessageType.GetSettingsPropertyValue:
					const { key } = event.data;
					if (key) {
						const value = getSettingsPropertyValueAsString(
							meta,
							key,
						);
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
					dismissBanner();
					break;
			}
		};

		window.addEventListener('message', handleBrazeBannerMessage);
		return () => {
			window.removeEventListener('message', handleBrazeBannerMessage);
		};
	}, [
		meta,
		meta.banner,
		authStatus.kind,
		fetchEmail,
		subscribeToNewsletter,
		createReminder,
		dismissBanner,
		postMessageToBrazeBanner,
	]);

	// Log Impressions with Braze and Button Clicks with Ophan
	// TODO

	/**
	 * If showBanner is false, we return null to unmount the component and remove the banner from the DOM.
	 * This can be triggered by the user clicking a dismiss button on the banner, which sends a message that we listen for in the useEffect above. When we receive that message, we set showBanner to false, which causes the component to unmount and the banner to be removed from the DOM.
	 */
	if (!showBanner) {
		return null;
	}

	return (
		<div
			className="braze-banner"
			style={{
				minHeight,
			}}
			css={
				wrapperModeEnabled
					? css`
							max-height: 65svh;
							border-top: 1px solid rgb(0, 0, 0);
							background-color: ${wrapperModeBackgroundColor};
							@media (max-width: 660px) {
								border: none;
							}
					  `
					: undefined
			}
		>
			<div
				className="braze-banner-content-wrapper"
				css={
					wrapperModeEnabled
						? css`
								background-color: ${wrapperModeBackgroundColor};
								box-sizing: border-box;
								position: relative;
								display: grid;
								margin: 0px auto;
								padding: 12px 4px 0px 12px;
								bottom: 0px;
								column-gap: 10px;
								align-self: stretch;
								max-width: 1300px;
								grid-template:
									'logo vert-line copy-container close-button'
									/ 219px 1px 840px auto;
								@media (max-width: 1300px) {
									max-width: 1140px;
									grid-template:
										'logo vert-line copy-container close-button'
										/ 140px 1px 840px auto;
								}
								@media (max-width: 1140px) {
									max-width: 980px;
									grid-template:
										'copy-container close-button'
										/ auto 68px;
								}
								@media (max-width: 980px) {
									max-width: 740px;
									grid-template:
										'. copy-container close-button close-button'
										/ minmax(0px, 0.5fr)
										492px max-content minmax(0px, 0.5fr);
									padding: 12px 12px 0px;
								}
								@media (max-width: 660px) {
									max-width: 660px;
									grid-template:
										'. .'
										'copy-container close-button' / auto 0px;
								}
						  `
						: undefined
				}
			>
				{wrapperModeEnabled && (
					<>
						<div
							className="logo"
							css={css`
								box-sizing: border-box;
								grid-area: logo;
								justify-self: end;
								width: 128px;
								height: 41px;
								-webkit-box-pack: end;
								justify-content: end;
								margin-top: 20px;

								@media (max-width: 1140px) {
									display: none;
								}
							`}
						>
							<SvgGuardianLogo
								textColor={wrapperModeForegroundColor}
							/>
						</div>
						<div
							className="vert-line"
							css={css`
								box-sizing: border-box;
								grid-area: vert-line;
								background-color: ${wrapperModeForegroundColor};
								width: 1px;
								opacity: 0.2;
								margin: 24px 8px 0px;

								@media (max-width: 1140px) {
									display: none;
								}
							`}
						/>
					</>
				)}
				<div
					ref={containerRef}
					className="braze-banner-content"
					css={
						wrapperModeEnabled
							? css`
									grid-area: copy-container;
									padding-left: 12px;
									padding-right: 12px;
									padding-top: 24px;
									padding-bottom: 12px;
									@media (max-width: 1140px) {
										padding-left: 0px;
										padding-right: 0px;
									}
									@media (max-width: 660px) {
										padding-top: 0px;
										padding-bottom: 0px;
									}
									@media (max-width: 660px) {
										padding-top: 24px;
									}
							  `
							: undefined
					}
				/>
				{wrapperModeEnabled && (
					<div
						className="close-button-container"
						css={css`
							box-sizing: border-box;
							grid-area: close-button;
							display: flex;
							-webkit-box-pack: justify;
							justify-content: space-between;
							column-gap: 2px;
							padding-right: 8px;
							margin-top: 24px;
							flex-direction: row-reverse;

							@media (max-width: 980px) {
								margin-top: 8px;
							}
							@media (max-width: 660px) {
								position: sticky;
								top: 8px;
							}
						`}
					>
						<div
							id="close-button"
							css={css`
								box-sizing: border-box;
								margin: 0;
								@media (max-width: 980px) {
									margin-left: 8px;
								}
							`}
						>
							<button
								onClick={() => {
									dismissBanner();
								}}
								type="button"
								aria-live="polite"
								css={css`
									display: inline-flex;
									-webkit-box-pack: center;
									justify-content: center;
									-webkit-box-align: center;
									align-items: center;
									box-sizing: border-box;
									border: none;
									background: color-mix(
										in srgb,
										${wrapperModeBackgroundColor},
										${getContrastMix(
												wrapperModeBackgroundColor,
											)}
											5%
									);
									cursor: pointer;
									transition: 0.3s ease-in-out;
									text-decoration: none;
									white-space: nowrap;
									vertical-align: middle;
									font-size: 1.0625rem;
									line-height: 1.3;
									font-weight: 700;
									font-style: normal;
									--source-text-decoration-thickness: 2px;
									height: 36px;
									min-height: 36px;
									border-radius: 36px;
									color: rgb(0, 0, 0);
									padding: 0px;
									width: 36px;
									margin: 0;
									@media (max-width: 980px) {
										margin-top: 4px;
										margin-right: 4px;
									}
								`}
							>
								<span
									css={css`
										box-sizing: border-box;
										position: absolute;
										overflow: hidden;
										white-space: nowrap;
										width: 1px;
										height: 1px;
										margin: -1px;
										padding: 0;
										border: 0;
										clip: rect(1px, 1px, 1px, 1px);
										-webkit-clip-path: inset(50%);
										clip-path: inset(50%);
									`}
								>
									Close banner
								</span>
								<svg
									viewBox="-3 2 30 30"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									width="24"
									height="24"
									css={css`
										flex: 0 0 auto;
										display: block;
										fill: currentcolor;
										position: relative;
										width: 26px;
										height: auto;
									`}
								>
									<g fill="currentColor">
										<path
											d="m1 7.224 10.498 10.498h1.004L23 7.224l-.98-.954L12 14.708 1.98 6.27z"
											transform="translate(0 0)"
											css={css`
												fill: ${wrapperModeForegroundColor};
											`}
										></path>
										<path
											d="m1 7.224 10.498 10.498h1.004L23 7.224l-.98-.954L12 14.708 1.98 6.27z"
											transform="scale(1 -1) translate(0 -3)"
											transform-origin="center"
											css={css`
												fill: ${wrapperModeForegroundColor};
											`}
										></path>
									</g>
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
