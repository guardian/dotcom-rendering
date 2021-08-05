import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import {
	getBodyEnd,
	getViewLog,
	logView,
	getWeeklyArticleHistory,
} from '@guardian/automat-client';
import {
	isRecurringContributor,
	getLastOneOffContributionTimestamp,
	shouldHideSupportMessaging,
	hasCmpConsentForArticleCount,
	getEmail,
	MODULES_VERSION,
	hasOptedOutOfArticleCount,
} from '@root/src/web/lib/contributions';
import { getForcedVariant } from '@root/src/web/lib/readerRevenueDevUtils';
import { CanShowResult } from '@root/src/web/lib/messagePicker';
import { initPerf } from '@root/src/web/browser/initPerf';
import {
	OphanComponentEvent,
	sendOphanComponentEvent,
	submitComponentEvent,
	SdcTestMeta,
} from '@root/src/web/browser/ophan/ophan';
import { Metadata } from '@guardian/automat-client/dist/types';
import { setAutomat } from '@root/src/web/lib/setAutomat';
import { cmp } from '@guardian/consent-management-platform';
import { getCookie } from '../../browser/cookie';
import { useHasBeenSeen } from '../../lib/useHasBeenSeen';

type HasBeenSeen = [boolean, (el: HTMLDivElement) => void];

type PreEpicConfig = {
	meta: SdcTestMeta;
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
			epicViewLog: getViewLog(),
			weeklyArticleHistory: getWeeklyArticleHistory(),
			hasOptedOutOfArticleCount: await hasOptedOutOfArticleCount(),
			mvtId: Number(getCookie('GU_mvt_id')),
			countryCode: data.countryCode,
			modulesVersion: MODULES_VERSION,
			url: window.location.origin + window.location.pathname,
		},
	} as Metadata; // Metadata type incorrectly does not include required hasOptedOutOfArticleCount property
};

export const canShow = async (
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

	const response = await getBodyEnd(
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

	const { meta, module } = json.data;
	return {
		show: true,
		meta: {
			meta,
			module,
			email,
			hasConsentForArticleCount,
			stage,
		},
	};
};

export const ReaderRevenueEpic = ({
	meta,
	module,
	email,
	hasConsentForArticleCount,
	stage,
}: EpicConfig) => {
	const [Epic, setEpic] = useState<React.FC<EpicProps>>();
	const [hasBeenSeen, setNode] = useHasBeenSeen({
		rootMargin: '-18px',
		threshold: 0,
		debounce: true,
	}) as HasBeenSeen;

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
				sendOphanComponentEvent('INSERT', meta);
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

	useEffect(() => {
		if (hasBeenSeen && meta) {
			// Should only run once
			const { abTestName } = meta;

			logView(abTestName);

			sendOphanComponentEvent('VIEW', meta);
		}
	}, [hasBeenSeen, meta]);
	if (Epic) {
		return (
			<div ref={setNode} css={wrapperMargins}>
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
