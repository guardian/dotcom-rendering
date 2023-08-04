import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { cmp } from '@guardian/consent-management-platform';
import { useEffect, useState } from 'react';
import { getAlreadyVisitedCount } from '../lib/alreadyVisited.ts';
import { getArticleCounts } from '../lib/articleCount.ts';
import type { ArticleCounts } from '../lib/articleCount.ts';
import { getLocaleCode } from '../lib/getCountryCode.ts';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker.ts';
import { pickMessage } from '../lib/messagePicker.ts';
import { useAuthStatus } from '../lib/useAuthStatus.ts';
import { useBraze } from '../lib/useBraze.ts';
import { useOnce } from '../lib/useOnce.ts';
import { useSignInGateWillShow } from '../lib/useSignInGateWillShow.ts';
import type { TagType } from '../types/tag.ts';
import {
	BrazeBanner,
	canShowBrazeBanner,
} from './StickyBottomBanner/BrazeBanner.tsx';
import {
	canShowPuzzlesBanner,
	canShowRRBanner,
	PuzzlesBanner,
	ReaderRevenueBanner,
} from './StickyBottomBanner/ReaderRevenueBanner.tsx';
import type {
	BannerProps,
	CanShowFunctionType,
} from './StickyBottomBanner/ReaderRevenueBanner.tsx';

type Props = {
	contentType: string;
	sectionId: string;
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
	BannerComponent: typeof ReaderRevenueBanner;
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
		sectionId,
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
		sectionId: string;
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
						sectionId,
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
	idApiUrl: string,
	tags: TagType[],
	shouldHideReaderRevenue: boolean,
): CandidateConfig<any> => ({
	candidate: {
		id: 'braze-banner',
		canShow: () =>
			canShowBrazeBanner(
				brazeMessages,
				brazeArticleContext,
				tags,
				shouldHideReaderRevenue,
			),
		show: (meta: any) => () =>
			<BrazeBanner meta={meta} idApiUrl={idApiUrl} />,
	},
	timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
});

export const StickyBottomBanner = ({
	contentType,
	sectionId,
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
	const authStatus = useAuthStatus();
	const isSignedIn =
		authStatus.kind === 'SignedInWithOkta' ||
		authStatus.kind === 'SignedInWithCookies';
	const [SelectedBanner, setSelectedBanner] = useState<MaybeFC | null>(null);
	const [asyncArticleCounts, setAsyncArticleCounts] =
		useState<Promise<ArticleCounts | undefined>>();
	const signInGateWillShow = useSignInGateWillShow({
		isSignedIn,
		contentType,
		sectionId,
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
			sectionId,
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
			sectionId,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			isSensitive,
			tags,
			contributionsServiceUrl,
			idApiUrl,
		});
		const brazeArticleContext: BrazeArticleContext = {
			section: sectionId,
		};
		const brazeBanner = buildBrazeBanner(
			brazeMessages as BrazeMessagesInterface,
			brazeArticleContext,
			idApiUrl,
			tags,
			shouldHideReaderRevenue,
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
