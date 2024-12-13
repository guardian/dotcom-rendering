import { css } from '@emotion/react';
import {
	cmp,
	getCookie,
	startPerformanceMeasure,
	storage,
} from '@guardian/libs';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { getEpic, getEpicViewLog } from '@guardian/support-dotcom-components';
import type {
	EpicPayload,
	ModuleData,
	ModuleDataResponse,
	WeeklyArticleHistory,
} from '@guardian/support-dotcom-components/dist/dotcom/types';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../../client/ophan/ophan';
import {
	hasCmpConsentForBrowserId,
	hasCmpConsentForWeeklyArticleCount,
	hasOptedOutOfArticleCount,
	shouldHideSupportMessaging,
} from '../../lib/contributions';
import { lazyFetchEmailWithTimeout } from '../../lib/fetchEmail';
import type { CanShowResult } from '../../lib/messagePicker';
import { setAutomat } from '../../lib/setAutomat';
import type { TagType } from '../../types/tag';
import { useConfig } from '../ConfigContext';

export type EpicConfig = {
	module: ModuleData;
	fetchEmail?: () => Promise<string | null>;
	hasConsentForArticleCount: boolean;
	stage: string;
};

const wrapperMargins = css`
	margin: 18px 0;
	clear: both;
`;

export type CanShowData = {
	isSignedIn: boolean;
	countryCode?: string;
	contentType: string;
	sectionId: string;
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

const buildPayload = async (
	data: CanShowData & { hideSupportMessagingForUser: boolean },
): Promise<EpicPayload> => ({
	tracking: {
		ophanPageId: window.guardian.config.ophan.pageViewId,
		platformId: 'GUARDIAN_WEB',
		clientName: 'dcr',
		referrerUrl: window.location.origin + window.location.pathname,
	},
	targeting: {
		contentType: data.contentType,
		sectionId: data.sectionId,
		shouldHideReaderRevenue: data.shouldHideReaderRevenue,
		isMinuteArticle: data.isMinuteArticle,
		isPaidContent: data.isPaidContent,
		tags: data.tags,
		showSupportMessaging: !data.hideSupportMessagingForUser,
		epicViewLog: getEpicViewLog(storage.local),
		weeklyArticleHistory: await data.asyncArticleCount,

		hasOptedOutOfArticleCount: await hasOptedOutOfArticleCount(),
		mvtId: Number(getCookie({ name: 'GU_mvt_id', shouldMemoize: true })),
		countryCode: data.countryCode,
		url: window.location.origin + window.location.pathname,
		browserId: (await hasCmpConsentForBrowserId())
			? data.browserId
			: undefined,
		isSignedIn: data.isSignedIn,
	},
});

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

	const hideSupportMessagingForUser = shouldHideSupportMessaging(isSignedIn);

	if (hideSupportMessagingForUser === 'Pending') {
		// We don't yet know the user's supporter status
		return Promise.resolve({ show: false });
	}

	if (shouldHideReaderRevenue || isPaidContent) {
		// We never serve Reader Revenue epics in this case
		return Promise.resolve({ show: false });
	}
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'supporterRevenue',
		'contributions-epic-data',
	);

	const contributionsPayload = await buildPayload({
		...data,
		hideSupportMessagingForUser,
	});

	const response: ModuleDataResponse = await getEpic(
		contributionsServiceUrl,
		contributionsPayload,
	);
	const module: ModuleData | undefined = response.data?.module;

	endPerformanceMeasure();

	if (!module) {
		return { show: false };
	}

	const fetchEmail: (() => Promise<string | null>) | undefined = isSignedIn
		? lazyFetchEmailWithTimeout(idApiUrl)
		: undefined;

	const hasConsentForArticleCount =
		await hasCmpConsentForWeeklyArticleCount();

	return {
		show: true,
		meta: {
			module,
			fetchEmail,
			hasConsentForArticleCount,
			stage,
		},
	};
};

export const ReaderRevenueEpic = ({
	module,
	fetchEmail,
	hasConsentForArticleCount,
	stage,
}: EpicConfig) => {
	const [Epic, setEpic] = useState<React.ElementType | null>(null);
	const { renderingTarget } = useConfig();

	const openCmp = () => {
		cmp.showPrivacyManager();
	};

	useEffect(() => {
		setAutomat();

		const { endPerformanceMeasure } = startPerformanceMeasure(
			'supporterRevenue',
			'contributions-epic-module',
		);

		import(
			/* webpackChunkName: "contributions-epic" */ `../marketing/epics/ContributionsEpic`
		)
			.then((epicModule) => {
				endPerformanceMeasure();
				setEpic(() => epicModule.ContributionsEpic); // useState requires functions to be wrapped
			})
			.catch((error) => {
				const msg =
					error instanceof Error
						? `Error importing RR epic: ${error.message}`
						: 'Unknown error';

				console.log(msg);
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-epic',
				);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (Epic !== null) {
		return (
			<div css={wrapperMargins}>
				{}
				<Epic
					{...module.props}
					fetchEmail={fetchEmail}
					submitComponentEvent={(event: ComponentEvent) =>
						void submitComponentEvent(event, renderingTarget)
					}
					openCmp={openCmp}
					hasConsentForArticleCount={hasConsentForArticleCount}
					stage={stage}
				/>
			</div>
		);
	}

	return null;
};
