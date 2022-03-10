import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { onConsentChange } from '@guardian/consent-management-platform';
import { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { CountryCode, getCookie, joinUrl, log, storage } from '@guardian/libs';
import {
	getLastOneOffContributionTimestamp,
	isRecurringContributor,
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
				const msg = `Error fetching country code: ${e}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'liveblog-epic',
				);
			});
	}, []);

	return countryCode;
};

function consentGivenForArticleCounts(consent: ConsentState): boolean {
	const REQUIRED_CONSENTS_FOR_ARTICLE_COUNT = [1, 3, 7];
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
	log('dotcom', 'LiveEpic has consent state');
	if (!countryCode) return;
	log('dotcom', 'LiveEpic has countryCode');

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
 * @param url string - The url of the compoenent
 * @param name string - The name of the compoenent
 * @param props object - The props of the compoenent
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
				const msg = `Error importing LiveBlog epic: ${err}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'liveblog-epic',
				);
			});
	}, [url, name]);

	if (!Epic) return null;
	log('dotcom', 'LiveEpic has the Epic');

	return (
		<aside
			css={css`
				margin-bottom: ${space[3]}px;
			`}
		>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<Epic {...props} />
		</aside>
	);
};

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
	const { data } = useApi<{
		data: {
			module: {
				url: string;
				name: string;
				props: { [key: string]: unknown };
			};
		};
	}>(
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
	// no banner should be shown data is equal to {}, hence the Object.keys
	if (!data || Object.keys(data).length === 0) return null;
	log('dotcom', 'LiveEpic has a module');

	// Take any returned module and render it
	return (
		<Render
			url={data.data.module.url}
			name={data.data.module.name}
			props={data.data.module.props}
		/>
	);
};

/**
 * LiveEpic is the Support the Guardian banner which appears in-between blocks in blogs
 *
 * There are three main steps to create this epic:
 *
 * 1. usePayload - Build the payload. The config object we send to contributions
 * 2. Fetch - POST the payload to the contributions endpoint
 * 3. Render - Take the url, props and name data we got in response to our fetch and dynamically import
 *    and render the Epic component using it
 */
export const LiveEpic = ({
	section,
	shouldHideReaderRevenue,
	isPaidContent,
	tags,
	contributionsServiceUrl,
}: Props) => {
	log('dotcom', 'LiveEpic started');
	// First construct the payload
	const payload = usePayload({
		shouldHideReaderRevenue,
		section,
		isPaidContent,
		tags,
	});

	if (!payload) return null;

	// Using the payload, make a fetch request to contributions
	return (
		<Fetch
			payload={payload}
			contributionsServiceUrl={contributionsServiceUrl}
		/>
	);
};
