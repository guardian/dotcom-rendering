import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import type { CountryCode } from '@guardian/libs';
import { cmp, isString, storage } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getArticleCounts } from '../lib/articleCount';
import type { ArticleCounts } from '../lib/articleCount';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker';
import { pickMessage } from '../lib/messagePicker';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useBraze } from '../lib/useBraze';
import { useCountryCode } from '../lib/useCountryCode';
import { useOnce } from '../lib/useOnce';
import { useSignInGateWillShow } from '../lib/useSignInGateWillShow';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import {
	BrazeBanner,
	canShowBrazeBanner,
} from './StickyBottomBanner/BrazeBanner';
import {
	canShowRRBanner,
	ReaderRevenueBanner,
} from './StickyBottomBanner/ReaderRevenueBanner';
import type {
	BannerProps,
	CanShowFunctionType,
} from './StickyBottomBanner/ReaderRevenueBanner';

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
};

type RRBannerConfig = {
	id: string;
	BannerComponent: typeof ReaderRevenueBanner;
	canShowFn: CanShowFunctionType<BannerProps>;
	isEnabled: boolean;
};

const getBannerLastClosedAt = (key: string): string | undefined => {
	const item = storage.local.get(`gu.prefs.${key}`);
	return isString(item) ? item : undefined;
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
		countryCode,
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
		countryCode: CountryCode;
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
						countryCode,
						contentType,
						sectionId,
						shouldHideReaderRevenue,
						isMinuteArticle,
						isPaidContent,
						isSensitive,
						tags,
						contributionsServiceUrl,
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
					() => (
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
		show: (meta: any) => () => (
			<BrazeBanner meta={meta} idApiUrl={idApiUrl} />
		),
	},
	timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
});

/**
 * The reader revenue banner at the end of articles
 *
 * ## Why does this need to be an Island?
 *
 * The content of the banner is personalised to an individual page view.
 *
 * ---
 *
 * (No visual story exists)
 */
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
	remoteBannerSwitch,
}: Props & {
	remoteBannerSwitch: boolean;
	isSensitive: boolean;
}) => {
	const { renderingTarget } = useConfig();
	const { brazeMessages } = useBraze(idApiUrl, renderingTarget);

	const countryCode = useCountryCode('sticky-bottom-banner');
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
		currentLocaleCode: countryCode,
	});

	useEffect(() => {
		setAsyncArticleCounts(getArticleCounts(pageId, tags, contentType));
	}, [contentType, tags, pageId]);

	useOnce(() => {
		if (!countryCode) return;
		const CMP = buildCmpBannerConfig();

		const readerRevenue = buildReaderRevenueBannerConfig(
			remoteBannerSwitch,
		)({
			isSignedIn,
			countryCode,
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
			candidates: [CMP, brazeBanner, readerRevenue],
			name: 'banner',
		};

		pickMessage(bannerConfig, renderingTarget)
			.then((PickedBanner: () => MaybeFC) =>
				setSelectedBanner(PickedBanner),
			)
			.catch((e) =>
				console.error(
					`StickyBottomBanner pickMessage - error: ${String(e)}`,
				),
			);
	}, [isSignedIn, countryCode, brazeMessages, asyncArticleCounts]);

	if (SelectedBanner) {
		return <SelectedBanner />;
	}

	return null;
};
