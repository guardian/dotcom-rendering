import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { getCookie } from '@guardian/libs';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useEffect, useState } from 'react';
import { getArticleCounts } from '../lib/articleCount';
import { isServer } from '../lib/isServer';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker';
import { pickMessage } from '../lib/messagePicker';
import { type AuthStatus, useAuthStatus } from '../lib/useAuthStatus';
import { useBraze } from '../lib/useBraze';
import { useCountryCode } from '../lib/useCountryCode';
import { useOnce } from '../lib/useOnce';
import type { TagType } from '../types/tag';
import { AdSlot } from './AdSlot.web';
import { canShowBrazeEpic, MaybeBrazeEpic } from './SlotBodyEnd/BrazeEpic';
import {
	canShowReaderRevenueEpic,
	ReaderRevenueEpic,
} from './SlotBodyEnd/ReaderRevenueEpic';
import type {
	CanShowData as RRCanShowData,
	EpicConfig as RREpicConfig,
} from './SlotBodyEnd/ReaderRevenueEpic';

type Props = {
	contentType: string;
	sectionId: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	idApiUrl: string;
	stage: string;
	pageId: string;
	keywordIds: string;
	renderAds: boolean;
	isLabs: boolean;
};

const buildReaderRevenueEpicConfig = (
	canShowData: RRCanShowData,
): CandidateConfig<RREpicConfig> => {
	return {
		candidate: {
			id: 'reader-revenue-banner',
			canShow: () => canShowReaderRevenueEpic(canShowData),
			show: (meta: RREpicConfig) => () => {
				return <ReaderRevenueEpic {...meta} />;
			},
		},
		timeoutMillis: null,
	};
};

const buildBrazeEpicConfig = (
	brazeMessages: BrazeMessagesInterface,
	countryCode: string,
	idApiUrl: string,
	contentType: string,
	brazeArticleContext: BrazeArticleContext,
	tags: TagType[],
	shouldHideReaderRevenue: boolean,
): CandidateConfig<any> => {
	return {
		candidate: {
			id: 'braze-epic',
			canShow: () =>
				canShowBrazeEpic(
					brazeMessages,
					brazeArticleContext,
					contentType,
					tags,
					shouldHideReaderRevenue,
				),
			show: (meta: any) => () =>
				(
					<MaybeBrazeEpic
						meta={meta}
						countryCode={countryCode}
						idApiUrl={idApiUrl}
					/>
				),
		},
		timeoutMillis: 2000,
	};
};

function getIsSignedIn(authStatus: AuthStatus): boolean | undefined {
	switch (authStatus.kind) {
		case 'Pending':
			return undefined;
		case 'SignedInWithCookies':
		case 'SignedInWithOkta':
			return true;
		case 'SignedOutWithCookies':
		case 'SignedOutWithOkta':
			return false;
	}
}

/**
 * Conditionally show an “epic” at the end of a article.
 *
 * ## Why does this need to be an Island?
 *
 * The decision is specific to a page view.
 */
export const SlotBodyEnd = ({
	contentType,
	sectionId,
	shouldHideReaderRevenue,
	isMinuteArticle,
	isPaidContent,
	tags,
	contributionsServiceUrl,
	idApiUrl,
	stage,
	pageId,
	keywordIds,
	renderAds,
	isLabs,
}: Props) => {
	const { brazeMessages } = useBraze(idApiUrl);
	const countryCode = useCountryCode();
	const isSignedIn = getIsSignedIn(useAuthStatus());
	const browserId = isServer
		? null
		: getCookie({ name: 'bwid', shouldMemoize: true });
	const [SelectedEpic, setSelectedEpic] = useState<React.ElementType | null>(
		null,
	);
	const [asyncArticleCount, setAsyncArticleCount] =
		useState<Promise<WeeklyArticleHistory | undefined>>();

	// Show the article end slot if the epic is not shown, currently only used in the US for Public Good
	const showArticleEndSlot =
		!isServer &&
		renderAds &&
		!isLabs &&
		countryCode === 'US' &&
		window.guardian.config.switches.articleEndSlot;

	useEffect(() => {
		setAsyncArticleCount(
			getArticleCounts(pageId, keywordIds).then(
				(counts) => counts?.weeklyArticleHistory,
			),
		);
	}, [pageId, keywordIds]);

	useOnce(() => {
		const readerRevenueEpic = buildReaderRevenueEpicConfig({
			isSignedIn,
			countryCode,
			contentType,
			sectionId,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			tags,
			contributionsServiceUrl,
			idApiUrl,
			stage,
			asyncArticleCount: asyncArticleCount as Promise<
				WeeklyArticleHistory | undefined
			>,
			browserId: browserId ?? undefined,
		});
		const brazeArticleContext: BrazeArticleContext = {
			section: sectionId,
		};
		const brazeEpic = buildBrazeEpicConfig(
			brazeMessages as BrazeMessagesInterface,
			countryCode as string,
			idApiUrl,
			contentType,
			brazeArticleContext,
			tags,
			shouldHideReaderRevenue,
		);
		const epicConfig: SlotConfig = {
			candidates: [brazeEpic, readerRevenueEpic],
			name: 'slotBodyEnd',
		};

		pickMessage(epicConfig)
			.then((PickedEpic: () => MaybeFC) => setSelectedEpic(PickedEpic))
			.catch((e) =>
				console.error(`SlotBodyEnd pickMessage - error: ${String(e)}`),
			);
	}, [isSignedIn, countryCode, brazeMessages, asyncArticleCount]);

	if (SelectedEpic !== null) {
		return (
			<div id="slot-body-end">
				<SelectedEpic />
			</div>
		);
	} else if (showArticleEndSlot) {
		return (
			<div id="slot-body-end">
				<AdSlot data-print-layout="hide" position="article-end" />
			</div>
		);
	}

	return null;
};
