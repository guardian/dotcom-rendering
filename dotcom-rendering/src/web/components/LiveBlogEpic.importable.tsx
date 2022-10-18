import { css } from '@emotion/react';
import { onConsentChange } from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import type { CountryCode } from '@guardian/libs';
import { getCookie, joinUrl, log, storage } from '@guardian/libs';
import { space } from '@guardian/source-foundations';
import type { ModuleDataResponse } from '@guardian/support-dotcom-components';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { submitComponentEvent } from '../browser/ophan/ophan';
import {
	getLastOneOffContributionTimestamp,
	isRecurringContributor,
	REQUIRED_CONSENTS_FOR_ARTICLE_COUNT,
	shouldHideSupportMessaging,
} from '../lib/contributions';
import { getLocaleCode } from '../lib/getCountryCode';
import { setAutomat } from '../lib/setAutomat';
import { useApi } from '../lib/useApi';

type Props = {
	section: string;
	shouldHideReaderRevenue: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
};

const useConsent = () => {
	const [consent, setConsent] = useState<ConsentState>();
	const hasOptedOut = getCookie({ name: 'gu_article_count_opt_out' });

	useEffect(() => {
		if (hasOptedOut) return;
		onConsentChange((state) => {
			setConsent(state);
		});
	}, [hasOptedOut]);

	return consent;
};

const useCountryCode = () => {
	const [countryCode, setCountryCode] = useState<CountryCode | null>();

	useEffect(() => {
		getLocaleCode()
			.then((cc) => {
				setCountryCode(cc);
			})
			.catch((e) => {
				const msg = `Error fetching country code: ${String(e)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'liveblog-epic',
				);
			});
	}, []);

	return countryCode;
};

const useEpic = ({ url, name }: { url: string; name: string }) => {
	// Using state here to store the Epic component that gets imported allows
	// us to render it with React (instead of inserting it into the dom manually)
	const [Epic, setEpic] = useState<React.FC<{ [key: string]: unknown }>>();

	useEffect(() => {
		setAutomat();
		window
			.guardianPolyfilledImport(url)
			.then((epicModule) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				setEpic(() => epicModule[name]); // useState requires functions to be wrapped
			})
			.catch((err) => {
				const msg = `Error importing LiveBlog epic: ${String(err)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'liveblog-epic',
				);
			});
	}, [url, name]);

	return { Epic };
};

function consentGivenForArticleCounts(consent: ConsentState): boolean {
	const { ccpa, tcfv2, aus } = consent;

	if (ccpa || aus) {
		return true;
	}

	if (tcfv2) {
		const hasRequiredConsents = REQUIRED_CONSENTS_FOR_ARTICLE_COUNT.every(
			(tcfConsent) => tcfv2.consents[tcfConsent],
		);

		if (!hasRequiredConsents) {
			storage.local.remove('gu.history.dailyArticleCount');
			storage.local.remove('gu.history.weeklyArticleCount');
		}

		return hasRequiredConsents;
	}

	return false;
}

/**
 * usePayload
 *
 * takes a series of CAPI values, reads consent, the users country, some cookie
 * values and then constructs a config object with `tracking` and `targeting`
 * properties
 *
 * @returns the payload object required to make the POST request to contributions
 */
const usePayload = ({
	shouldHideReaderRevenue,
	section,
	isPaidContent,
	tags,
}: {
	shouldHideReaderRevenue: boolean;
	section: string;
	isPaidContent: boolean;
	tags: TagType[];
}) => {
	const consent = useConsent();
	const countryCode = useCountryCode();
	const mvtId = getCookie({ name: 'GU_mvt_id', shouldMemoize: true }) || 0;
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });

	if (!consent) return;
	log('dotcom', 'LiveBlogEpic has consent state');
	if (!countryCode) return;
	log('dotcom', 'LiveBlogEpic has countryCode');

	return {
		tracking: {
			ophanPageId: window.guardian.config.ophan.pageViewId,
			platformId: 'GUARDIAN_WEB',
			clientName: 'dcr',
			referrerUrl: window.location.origin + window.location.pathname,
		},
		targeting: {
			contentType: 'LiveBlog',
			sectionId: section,
			shouldHideReaderRevenue: shouldHideReaderRevenue ?? false,
			isMinuteArticle: true,
			isPaidContent,
			tags,
			showSupportMessaging: !shouldHideSupportMessaging(isSignedIn),
			isRecurringContributor: isRecurringContributor(isSignedIn),
			lastOneOffContributionDate:
				getLastOneOffContributionTimestamp() ?? undefined,
			mvtId,
			countryCode,
			epicViewLog: storage.local.get('gu.contributions.views') || [],
			weeklyArticleHistory:
				storage.local.get('gu.history.weeklyArticleCount') || [],
			hasOptedOutOfArticleCount: !consentGivenForArticleCounts(consent),
			modulesVersion: 'v3',
			url: window.location.origin + window.location.pathname,
		},
	};
};

/**
 * Render
 *
 * Dynamically imports and renders a given module
 *
 * @param props
 * @param props.url string - The url of the component
 * @param props.name tring - The name of the component
 * @param props.props object - The props of the component
 * @returns The resulting react component
 */
const Render = ({
	url,
	name,
	props,
}: {
	url: string;
	name: string;
	props: { [key: string]: unknown };
}) => {
	const { Epic } = useEpic({ url, name });

	if (!Epic) return null;
	log('dotcom', 'LiveBlogEpic has the Epic');

	return (
		<aside
			css={css`
				margin-bottom: ${space[3]}px;
			`}
		>
			{}
			<Epic {...props} />
		</aside>
	);
};

/**
 * Using the payload, make a fetch request to contributions service
 *
 * @param payload - unknown
 * @param contributionsServiceUrl - string
 */
const Fetch = ({
	payload,
	contributionsServiceUrl,
}: {
	payload: unknown;
	contributionsServiceUrl: string;
}) => {
	let url = joinUrl(contributionsServiceUrl, 'liveblog-epic');

	// Check if we've been asked to force this epic
	const params = new URLSearchParams(window.location.search);
	if (params.get('force-liveblog-epic')) {
		url += '?force=true';
	}

	// Send the payload to Contributions to request a module
	const { data: response } = useApi<ModuleDataResponse>(
		url,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		},
	);

	// If we didn't get a module in response (or we're still waiting) do nothing. If
	// no epic should be shown the response is equal to {}, hence the Object.keys
	if (!response || !response.data || Object.keys(response).length === 0) {
		return null;
	}
	log('dotcom', 'LiveBlogEpic has a module');

	// Add submitComponentEvent function to props to enable Ophan tracking in the component
	const props = {
		...response.data.module.props,
		submitComponentEvent,
	};

	// Take any returned module and render it
	return (
		<Render
			url={response.data.module.url}
			name={response.data.module.name}
			props={props}
		/>
	);
};

function insertAfter(referenceNode: HTMLElement, newNode: Element) {
	referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * LiveBlogEpic is the support epic which appears in-between blocks in blogs
 *
 * There are three main steps to create this epic:
 *
 * 1. usePayload - Build the payload. The config object we send to contributions
 * 2. Fetch - POST the payload to the contributions endpoint
 * 3. Render - Take the url, props and name data we got in response to our fetch and dynamically import
 *    and render the Epic component using it
 */
export const LiveBlogEpic = ({
	section,
	shouldHideReaderRevenue,
	isPaidContent,
	tags,
	contributionsServiceUrl,
}: Props) => {
	log('dotcom', 'LiveBlogEpic started');
	// First construct the payload
	const payload = usePayload({
		shouldHideReaderRevenue,
		section,
		isPaidContent,
		tags,
	});
	if (!payload) return null;

	/**
	 * Here we decide where to insert the epic.
	 *
	 * If the url contains a permalink then we
	 * want to insert it immediately after that block to prevent any CLS issues.
	 *
	 * Otherwise, we choose a random position near the top of the blog
	 */
	const epicPlaceholder = document.createElement('article');
	if (window.location.href.includes('#block-')) {
		// Because we're using a permalink there's a possibility the epic will render in
		// view. To prevent confusing layout shift we initially hide the message so that
		// we can reveal (animate in) it once it has been rendered
		epicPlaceholder.classList.add('pending');
		const blockId = window.location.hash.slice(1);
		const blockLinkedTo = document.getElementById(blockId);
		if (blockLinkedTo) {
			insertAfter(blockLinkedTo, epicPlaceholder);
		}
		epicPlaceholder.classList.add('reveal');
		epicPlaceholder.classList.remove('pending');
	} else {
		// This is a simple page load so we simply insert the epic somewhere near the top
		// of the blog
		const randomPosition = Math.floor(Math.random() * 3) + 1; // 1, 2 or 3
		const aBlockNearTheTop =
			document.querySelectorAll<HTMLElement>('article.block')[
				randomPosition
			];
		if (aBlockNearTheTop) {
			insertAfter(aBlockNearTheTop, epicPlaceholder);
		}
	}

	return createPortal(
		<Fetch
			payload={payload}
			contributionsServiceUrl={contributionsServiceUrl}
		/>,
		epicPlaceholder,
	);
};
