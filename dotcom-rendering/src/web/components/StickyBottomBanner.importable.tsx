import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { cmp } from '@guardian/consent-management-platform';
import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { ArticleCounts } from '../../lib/articleCount';
import { getArticleCounts } from '../../lib/articleCount';
import { getAlreadyVisitedCount } from '../lib/alreadyVisited';
import { getLocaleCode } from '../lib/getCountryCode';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker';
import { pickMessage } from '../lib/messagePicker';
import { useBraze } from '../lib/useBraze';
import { useOnce } from '../lib/useOnce';
import { useSignInGateWillShow } from '../lib/useSignInGateWillShow';
import {
	BrazeBanner,
	canShowBrazeBanner,
} from './StickyBottomBanner/BrazeBanner';
import {
	canShowPuzzlesBanner,
	canShowRRBanner,
	PuzzlesBanner,
	ReaderRevenueBanner,
} from './StickyBottomBanner/ReaderRevenueBanner';
import type {
	BannerProps,
	CanShowFunctionType,
} from './StickyBottomBanner/ReaderRevenueBanner';

type Props = {
	contentType: string;
	sectionName?: string;
	section: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview: boolean;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;

	contributionsServiceUrl: string;
	idApiUrl: string;

	pageId: string;
	keywordIds: string;
};

type RRBannerConfig = {
	id: string;
	BannerComponent: React.FC<BannerProps>;
	canShowFn: CanShowFunctionType<BannerProps>;
	isEnabled: boolean;
};

const getBannerLastClosedAt = (key: string): string | undefined => {
	const item = localStorage.getItem(`gu.prefs.${key}`) as undefined | string;

	if (item) {
		const parsedItem = JSON.parse(item) as Record<string, any>;
		return parsedItem.value;
	}
	return item;
};

const DEFAULT_BANNER_TIMEOUT_MILLIS = 2000;

const buildCmpBannerConfig = (): CandidateConfig<void> => ({
	candidate: {
		id: 'cmpUi',
		canShow: () =>
			cmp
				.willShowPrivacyMessage()
				.then((result) =>
					result ? { show: true, meta: undefined } : { show: false },
				),
		show: () => {
			// New CMP is not a react component and is shown outside of react's world
			// so render nothing if it will show
			return null;
		},
	},
	timeoutMillis: null,
});

const buildRRBannerConfigWith = ({
	id,
	BannerComponent,
	canShowFn,
	isEnabled,
}: RRBannerConfig) => {
	return ({
		isSignedIn,
		asyncCountryCode,
		isPreview,
		asyncArticleCounts,
		signInGateWillShow = false,
		contentType,
		section,
		shouldHideReaderRevenue,
		isMinuteArticle,
		isPaidContent,
		isSensitive,
		tags,
		contributionsServiceUrl,
		idApiUrl,
	}: {
		isSignedIn: boolean;
		asyncCountryCode: Promise<string>;
		isPreview: boolean;
		asyncArticleCounts: Promise<ArticleCounts | undefined>;
		signInGateWillShow?: boolean;
		contentType: string;
		section: string;
		shouldHideReaderRevenue: boolean;
		isMinuteArticle: boolean;
		isPaidContent: boolean;
		isSensitive: boolean;
		tags: TagType[];
		contributionsServiceUrl: string;
		idApiUrl: string;
	}): CandidateConfig<BannerProps> => {
		return {
			candidate: {
				id,
				canShow: () =>
					canShowFn({
						remoteBannerConfig: isEnabled,
						isSignedIn,
						asyncCountryCode,
						contentType,
						sectionId: section,
						shouldHideReaderRevenue,
						isMinuteArticle,
						isPaidContent,
						isSensitive,
						tags,
						contributionsServiceUrl,
						alreadyVisitedCount: getAlreadyVisitedCount(),
						engagementBannerLastClosedAt: getBannerLastClosedAt(
							'engagementBannerLastClosedAt',
						),
						subscriptionBannerLastClosedAt: getBannerLastClosedAt(
							'subscriptionBannerLastClosedAt',
						),
						signInBannerLastClosedAt: getBannerLastClosedAt(
							'signInBannerLastClosedAt',
						),
						section,
						isPreview,
						idApiUrl,
						signInGateWillShow,
						asyncArticleCounts,
					}),
				show:
					({ meta, module, fetchEmail }: BannerProps) =>
					() =>
						(
							<BannerComponent
								meta={meta}
								module={module}
								fetchEmail={fetchEmail}
							/>
						),
			},
			timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
		};
	};
};

const buildPuzzlesBannerConfig = (isEnabled: boolean) =>
	buildRRBannerConfigWith({
		id: 'puzzles-banner',
		BannerComponent: PuzzlesBanner,
		canShowFn: canShowPuzzlesBanner,
		isEnabled,
	});

const buildReaderRevenueBannerConfig = (isEnabled: boolean) =>
	buildRRBannerConfigWith({
		id: 'reader-revenue-banner',
		BannerComponent: ReaderRevenueBanner,
		canShowFn: canShowRRBanner,
		isEnabled,
	});

const buildBrazeBanner = (
	brazeMessages: BrazeMessagesInterface,
	brazeArticleContext: BrazeArticleContext,
): CandidateConfig<any> => ({
	candidate: {
		id: 'braze-banner',
		canShow: () => canShowBrazeBanner(brazeMessages, brazeArticleContext),
		show: (meta: any) => () => <BrazeBanner meta={meta} />,
	},
	timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
});

export const StickyBottomBanner = ({
	contentType,
	sectionName,
	section,
	tags,
	isPaidContent,
	isPreview,
	shouldHideReaderRevenue,
	isMinuteArticle,
	isSensitive,
	contributionsServiceUrl,
	idApiUrl,
	pageId,
	keywordIds,
	remoteBannerSwitch,
	puzzleBannerSwitch,
}: Props & {
	remoteBannerSwitch: boolean;
	puzzleBannerSwitch: boolean;
	isSensitive: boolean;
}) => {
	const { brazeMessages } = useBraze(idApiUrl);

	const asyncCountryCode = getLocaleCode();
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	const [SelectedBanner, setSelectedBanner] = useState<React.FC | null>(null);
	const [asyncArticleCounts, setAsyncArticleCounts] =
		useState<Promise<ArticleCounts | undefined>>();
	const signInGateWillShow = useSignInGateWillShow({
		isSignedIn,
		contentType,
		sectionName,
		tags,
		isPaidContent,
		isPreview,
	});

	useEffect(() => {
		setAsyncArticleCounts(getArticleCounts(pageId, keywordIds));
	}, [pageId, keywordIds]);

	useOnce(() => {
		const CMP = buildCmpBannerConfig();
		const puzzlesBanner = buildPuzzlesBannerConfig(puzzleBannerSwitch)({
			isSignedIn,
			asyncCountryCode: asyncCountryCode as Promise<string>,
			isPreview,
			asyncArticleCounts: asyncArticleCounts as Promise<
				ArticleCounts | undefined
			>,
			contentType,
			section,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			isSensitive,
			tags,
			contributionsServiceUrl,
			idApiUrl,
		});
		const readerRevenue = buildReaderRevenueBannerConfig(
			remoteBannerSwitch,
		)({
			isSignedIn,
			asyncCountryCode: asyncCountryCode as Promise<string>,
			isPreview,
			asyncArticleCounts: asyncArticleCounts as Promise<
				ArticleCounts | undefined
			>,
			signInGateWillShow,
			contentType,
			section,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			isSensitive,
			tags,
			contributionsServiceUrl,
			idApiUrl,
		});
		const brazeArticleContext: BrazeArticleContext = {
			section: sectionName,
		};
		const brazeBanner = buildBrazeBanner(
			brazeMessages as BrazeMessagesInterface,
			brazeArticleContext,
		);
		const bannerConfig: SlotConfig = {
			candidates: [CMP, puzzlesBanner, readerRevenue, brazeBanner],
			name: 'banner',
		};

		pickMessage(bannerConfig)
			.then((PickedBanner: () => MaybeFC) =>
				setSelectedBanner(PickedBanner),
			)
			.catch((e) =>
				console.error(
					`StickyBottomBanner pickMessage - error: ${String(e)}`,
				),
			);
	}, [isSignedIn, asyncCountryCode, brazeMessages, asyncArticleCounts]);

	if (SelectedBanner) {
		return <SelectedBanner />;
	}

	return null;
};
