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
import type {
	EpicProps,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../../client/ophan/ophan';
import {
	hasCmpConsentForWeeklyArticleCount,
	hasOptedOutOfArticleCount,
	shouldHideSupportMessaging,
} from '../../lib/contributions';
import { lazyFetchEmailWithTimeout } from '../../lib/fetchEmail';
import type { CanShowResult } from '../../lib/messagePicker';
import { setAutomat } from '../../lib/setAutomat';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { TagType } from '../../types/tag';

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
	asyncArticleCount: Promise<WeeklyArticleHistory | undefined>;
	renderingTarget: RenderingTarget;
	ophanPageViewId: string;
	pageId?: string;
};

const buildPayload = async (
	data: CanShowData & { hideSupportMessagingForUser: boolean },
): Promise<EpicPayload> => ({
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
		isSignedIn: data.isSignedIn,
		pageId: data.pageId,
	},
});

export const canShowReaderRevenueEpic = async (
	data: CanShowData,
): Promise<CanShowResult<ModuleData<EpicProps>>> => {
	const {
		isSignedIn,
		shouldHideReaderRevenue,
		isPaidContent,
		contributionsServiceUrl,
		renderingTarget,
		ophanPageViewId,
	} = data;

	const hideSupportMessagingForUser = shouldHideSupportMessaging(isSignedIn);

	if (hideSupportMessagingForUser === 'Pending') {
		// We don't yet know the user's supporter status
		return { show: false };
	}

	if (shouldHideReaderRevenue || isPaidContent) {
		// We never serve Reader Revenue epics in this case
		return { show: false };
	}
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'supporterRevenue',
		'contributions-epic-data',
	);

	const contributionsPayload = await buildPayload({
		...data,
		hideSupportMessagingForUser,
	});

	const response: ModuleDataResponse<EpicProps> = await getEpic(
		contributionsServiceUrl,
		contributionsPayload,
	);
	const module: ModuleData<EpicProps> | undefined = response.data?.module;

	endPerformanceMeasure();

	if (!module) {
		return { show: false };
	}

	const fetchEmail: (() => Promise<string | null>) | undefined = isSignedIn
		? lazyFetchEmailWithTimeout()
		: undefined;

	const hasConsentForArticleCount =
		await hasCmpConsentForWeeklyArticleCount();

	const openCmp = () => {
		cmp.showPrivacyManager();
	};

	const { props, name } = module;
	const tracking: Tracking = {
		...props.tracking,
		ophanPageId: ophanPageViewId,
		platformId: 'GUARDIAN_WEB',
		referrerUrl: window.location.origin + window.location.pathname,
	};
	const enrichedProps: EpicProps = {
		...props,
		tracking,
		hasConsentForArticleCount,
		fetchEmail,
		submitComponentEvent: (componentEvent: ComponentEvent) =>
			void submitComponentEvent(componentEvent, renderingTarget),
		openCmp,
	};

	return {
		show: true,
		meta: {
			name,
			props: enrichedProps,
		},
	};
};

export const ReaderRevenueEpic = ({ props }: ModuleData<EpicProps>) => {
	const [Epic, setEpic] = useState<React.ElementType | null>(null);

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
				<Epic {...props} />
			</div>
		);
	}

	return null;
};
