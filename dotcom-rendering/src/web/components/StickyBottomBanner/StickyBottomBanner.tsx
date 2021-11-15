import { useState } from 'react';
import { cmp } from '@guardian/consent-management-platform';
import {
	canShowRRBanner,
	canShowPuzzlesBanner,
	ReaderRevenueBanner,
	PuzzlesBanner,
	BannerProps,
	CanShowFunctionType,
} from '@root/src/web/components/StickyBottomBanner/ReaderRevenueBanner';
import { getAlreadyVisitedCount } from '@root/src/web/lib/alreadyVisited';
import { useOnce } from '@root/src/web/lib/useOnce';
import {
	pickMessage,
	SlotConfig,
	MaybeFC,
	CandidateConfig,
} from '@root/src/web/lib/messagePicker';
import { CountryCode } from '@guardian/libs';
import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { useSignInGateWillShow } from '@root/src/web/lib/useSignInGateWillShow';
import { WeeklyArticleHistory } from '@guardian/automat-contributions/dist/lib/types';
import { BrazeBanner, canShowBrazeBanner } from './BrazeBanner';

type Props = {
	isSignedIn?: boolean;
	asyncCountryCode?: Promise<CountryCode | null>;
	CAPI: CAPIBrowserType;
	brazeMessages?: Promise<BrazeMessagesInterface>;
	asyncArticleCount?: Promise<WeeklyArticleHistory | undefined>;
	contentType: string;
	sectionName: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview: boolean;
};

type RRBannerConfig = {
	id: string;
	BannerComponent: React.FC<BannerProps>;
	canShowFn: CanShowFunctionType<BannerProps>;
	isEnabled: (switches: CAPIType['config']['switches']) => boolean;
};

const getBannerLastClosedAt = (key: string): string | undefined => {
	const item = localStorage.getItem(`gu.prefs.${key}`) as undefined | string;

	if (item) {
		const parsedItem = JSON.parse(item) as { [key: string]: any };
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
	return (
		CAPI: CAPIBrowserType,
		isSignedIn: boolean,
		asyncCountryCode: Promise<string>,
		isPreview: boolean,
		asyncArticleCount: Promise<WeeklyArticleHistory | undefined>,
		signInGateWillShow: boolean = false,
	): CandidateConfig<BannerProps> => {
		return {
			candidate: {
				id,
				canShow: () =>
					canShowFn({
						remoteBannerConfig: isEnabled(CAPI.config.switches),
						isSignedIn,
						asyncCountryCode,
						contentType: CAPI.contentType,
						sectionId: CAPI.config.section,
						shouldHideReaderRevenue: CAPI.shouldHideReaderRevenue,
						isMinuteArticle: CAPI.pageType.isMinuteArticle,
						isPaidContent: CAPI.pageType.isPaidContent,
						isSensitive: CAPI.config.isSensitive,
						tags: CAPI.tags,
						contributionsServiceUrl: CAPI.contributionsServiceUrl,
						alreadyVisitedCount: getAlreadyVisitedCount(),
						engagementBannerLastClosedAt: getBannerLastClosedAt(
							'engagementBannerLastClosedAt',
						),
						subscriptionBannerLastClosedAt: getBannerLastClosedAt(
							'subscriptionBannerLastClosedAt',
						),
						section: CAPI.config.section,
						isPreview,
						idApiUrl: CAPI.config.idApiUrl,
						signInGateWillShow,
						asyncArticleCount,
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

const buildPuzzlesBannerConfig = buildRRBannerConfigWith({
	id: 'puzzles-banner',
	BannerComponent: PuzzlesBanner,
	canShowFn: canShowPuzzlesBanner,
	isEnabled: (switches) => switches.puzzlesBanner,
});

const buildReaderRevenueBannerConfig = buildRRBannerConfigWith({
	id: 'reader-revenue-banner',
	BannerComponent: ReaderRevenueBanner,
	canShowFn: canShowRRBanner,
	isEnabled: (switches) => switches.remoteBanner,
});

const buildBrazeBanner = (
	brazeMessages: Promise<BrazeMessagesInterface>,
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
	isSignedIn,
	asyncCountryCode,
	CAPI,
	brazeMessages,
	asyncArticleCount,
	contentType,
	sectionName,
	tags,
	isPaidContent,
	isPreview,
}: Props) => {
	const [SelectedBanner, setSelectedBanner] = useState<React.FC | null>(null);
	const signInGateWillShow = useSignInGateWillShow({
		isSignedIn,
		contentType,
		sectionName,
		tags,
		isPaidContent,
		isPreview,
	});
	useOnce(() => {
		const CMP = buildCmpBannerConfig();
		const puzzlesBanner = buildPuzzlesBannerConfig(
			CAPI,
			isSignedIn as boolean,
			asyncCountryCode as Promise<string>,
			isPreview,
			asyncArticleCount as Promise<WeeklyArticleHistory | undefined>,
		);
		const readerRevenue = buildReaderRevenueBannerConfig(
			CAPI,
			isSignedIn as boolean,
			asyncCountryCode as Promise<CountryCode>,
			isPreview,
			asyncArticleCount as Promise<WeeklyArticleHistory | undefined>,
			signInGateWillShow,
		);
		const brazeArticleContext: BrazeArticleContext = {
			section: CAPI.sectionName,
		};
		const brazeBanner = buildBrazeBanner(
			brazeMessages as Promise<BrazeMessagesInterface>,
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
				console.error(`StickyBottomBanner pickMessage - error: ${e}`),
			);
	}, [isSignedIn, asyncCountryCode, CAPI, brazeMessages, asyncArticleCount]);

	if (SelectedBanner) {
		return <SelectedBanner />;
	}

	return null;
};
