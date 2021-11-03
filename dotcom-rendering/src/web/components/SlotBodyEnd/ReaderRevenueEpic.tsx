import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { getEpicMeta, getViewLog } from '@guardian/automat-contributions';
import {
	isRecurringContributor,
	getLastOneOffContributionTimestamp,
	shouldHideSupportMessaging,
	hasCmpConsentForArticleCount,
	getEmail,
	MODULES_VERSION,
	hasOptedOutOfArticleCount,
	hasCmpConsentForBrowserId,
} from '@root/src/web/lib/contributions';
import { getForcedVariant } from '@root/src/web/lib/readerRevenueDevUtils';
import { CanShowResult } from '@root/src/web/lib/messagePicker';
import { initPerf } from '@root/src/web/browser/initPerf';
import {
	OphanComponentEvent,
	submitComponentEvent,
} from '@root/src/web/browser/ophan/ophan';
import {
	Metadata,
	WeeklyArticleHistory,
} from '@guardian/automat-contributions/dist/lib/types';
import { setAutomat } from '@root/src/web/lib/setAutomat';
import { cmp } from '@guardian/consent-management-platform';
import { storage } from '@guardian/libs';
import { getCookie } from '../../browser/cookie';

type PreEpicConfig = {
	module: {
		url: string;
		props: { [key: string]: any };
	};
};

export type EpicConfig = PreEpicConfig & {
	email?: string;
	hasConsentForArticleCount: boolean;
	stage: string;
};

type EpicProps = {
	email?: string;
	submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
	openCmp: () => void;
	hasConsentForArticleCount: boolean;
	stage: string;
	// Also anything specified by support-dotcom-components
};

const checkForErrors = (response: Response) => {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`ReaderRevenueEpic | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
};

const wrapperMargins = css`
	margin: 18px 0;
`;

export type CanShowData = {
	isSignedIn?: boolean;
	countryCode?: string;
	contentType: string;
	sectionName?: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	idApiUrl: string;
	stage: string;
	asyncArticleCount: Promise<WeeklyArticleHistory | undefined>;
	browserId?: string;
};

const buildPayload = async (data: CanShowData): Promise<Metadata> => {
	return {
		tracking: {
			ophanPageId: window.guardian.config.ophan.pageViewId,
			ophanComponentId: '', // TODO: Remove ophanComponentId from @guardian/automat-client/dist/types.d.ts Tracking type
			platformId: 'GUARDIAN_WEB',
			clientName: 'dcr',
			referrerUrl: window.location.origin + window.location.pathname,
		},
		targeting: {
			contentType: data.contentType,
			sectionName: data.sectionName || '', // TODO update client to reflect that this is optional
			shouldHideReaderRevenue: data.shouldHideReaderRevenue,
			isMinuteArticle: data.isMinuteArticle,
			isPaidContent: data.isPaidContent,
			tags: data.tags,
			showSupportMessaging: !shouldHideSupportMessaging(
				data.isSignedIn || false,
			),
			isRecurringContributor: isRecurringContributor(
				data.isSignedIn || false,
			),
			lastOneOffContributionDate: getLastOneOffContributionTimestamp(),
			epicViewLog: getViewLog(storage.local),
			weeklyArticleHistory: await data.asyncArticleCount,
			hasOptedOutOfArticleCount: await hasOptedOutOfArticleCount(),
			mvtId: Number(getCookie('GU_mvt_id')),
			countryCode: data.countryCode,
			modulesVersion: MODULES_VERSION,
			url: window.location.origin + window.location.pathname,
			browserId: (await hasCmpConsentForBrowserId())
				? data.browserId
				: undefined,
		},
	} as Metadata; // Metadata type incorrectly does not include required hasOptedOutOfArticleCount property
};

export const canShowReaderRevenueEpic = async (
	data: CanShowData,
): Promise<CanShowResult<EpicConfig>> => {
	const {
		isSignedIn,
		shouldHideReaderRevenue,
		isPaidContent,
		contributionsServiceUrl,
		idApiUrl,
		stage,
	} = data;

	if (shouldHideReaderRevenue || isPaidContent) {
		// We never serve Reader Revenue epics in this case
		return Promise.resolve({ show: false });
	}
	const dataPerf = initPerf('contributions-epic-data');
	dataPerf.start();

	const forcedVariant = getForcedVariant('epic');
	const queryString = forcedVariant ? `?force=${forcedVariant}` : '';

	const contributionsPayload = await buildPayload(data);

	const response = await getEpicMeta(
		contributionsPayload,
		`${contributionsServiceUrl}/epic${queryString}`,
	);

	checkForErrors(response);

	const json: { data?: PreEpicConfig } = await response.json();

	if (!json.data) {
		return { show: false };
	}

	const email = isSignedIn ? await getEmail(idApiUrl) : undefined;

	const hasConsentForArticleCount = await hasCmpConsentForArticleCount();

	const { module } = json.data;
	return {
		show: true,
		meta: {
			module,
			email,
			hasConsentForArticleCount,
			stage,
		},
	};
};

export const ReaderRevenueEpic = ({
	module,
	email,
	hasConsentForArticleCount,
	stage,
}: EpicConfig) => {
	const [Epic, setEpic] = useState<React.FC<EpicProps>>();

	const openCmp = () => {
		cmp.showPrivacyManager();
	};

	useEffect(() => {
		setAutomat();

		const modulePerf = initPerf('contributions-epic-module');
		modulePerf.start();

		window
			.guardianPolyfilledImport(module.url)
			.then((epicModule: { ContributionsEpic: React.FC<EpicProps> }) => {
				modulePerf.end();
				setEpic(() => epicModule.ContributionsEpic); // useState requires functions to be wrapped
			})
			.catch((error) => {
				const msg = `Error importing RR epic: ${error}`;
				// eslint-disable-next-line no-console
				console.log(msg);
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-epic',
				);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (Epic) {
		return (
			<div css={wrapperMargins}>
				{/* eslint-disable react/jsx-props-no-spreading */}
				<Epic
					{...module.props}
					email={email}
					submitComponentEvent={submitComponentEvent}
					openCmp={openCmp}
					hasConsentForArticleCount={hasConsentForArticleCount}
					stage={stage}
				/>
				{/* eslint-enable react/jsx-props-no-spreading */}
			</div>
		);
	}

	return null;
};
