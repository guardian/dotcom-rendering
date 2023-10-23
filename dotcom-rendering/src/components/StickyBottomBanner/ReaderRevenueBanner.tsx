import { css } from '@emotion/react';
import { getCookie } from '@guardian/libs';
import {
	getBanner,
	getPuzzlesBanner,
} from '@guardian/support-dotcom-components';
import type {
	BannerPayload,
	ModuleData,
	ModuleDataResponse,
} from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import type { TestTracking } from '@guardian/support-dotcom-components/dist/shared/src/types/abTests/shared';
import { useEffect, useState } from 'react';
import { trackNonClickInteraction } from '../../client/ga/ga';
import { submitComponentEvent } from '../../client/ophan/ophan';
import type { ArticleCounts } from '../../lib/articleCount';
import {
	getLastOneOffContributionDate,
	getPurchaseInfo,
	hasCmpConsentForBrowserId,
	hasOptedOutOfArticleCount,
	lazyFetchEmailWithTimeout,
	MODULES_VERSION,
	setLocalNoBannerCachePeriod,
	shouldHideSupportMessaging,
	withinLocalNoBannerCachePeriod,
} from '../../lib/contributions';
import { getToday } from '../../lib/dailyArticleCount';
import { getZIndex } from '../../lib/getZIndex';
import type { CanShowResult } from '../../lib/messagePicker';
import { setAutomat } from '../../lib/setAutomat';
import { useIsInView } from '../../lib/useIsInView';
import { useOnce } from '../../lib/useOnce';
import type { TagType } from '../../types/tag';

type BaseProps = {
	isSignedIn: boolean;
	contentType: string;
	sectionId?: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	isSensitive: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	alreadyVisitedCount: number;
	engagementBannerLastClosedAt?: string;
	subscriptionBannerLastClosedAt?: string;
	signInBannerLastClosedAt?: string;
};

type BuildPayloadProps = BaseProps & {
	countryCode: string;
	optedOutOfArticleCount: boolean;
	asyncArticleCounts: Promise<ArticleCounts | undefined>;
};

type CanShowProps = BaseProps & {
	asyncCountryCode: Promise<string>;
	remoteBannerConfig: boolean;
	isPreview: boolean;
	idApiUrl: string;
	signInGateWillShow: boolean;
	asyncArticleCounts: Promise<ArticleCounts | undefined>;
};

type ReaderRevenueComponentType =
	| 'ACQUISITIONS_SUBSCRIPTIONS_BANNER'
	| 'ACQUISITIONS_OTHER';

export type CanShowFunctionType<T> = (
	props: CanShowProps,
) => Promise<CanShowResult<T>>;

const getArticleCountToday = (
	articleCounts: ArticleCounts | undefined,
): number | undefined => {
	const latest = articleCounts?.dailyArticleHistory[0];
	if (latest) {
		if (latest.day === getToday()) {
			return latest.count;
		}
		// article counting is enabled, but none so far today
		return 0;
	}
	return undefined;
};

const buildPayload = async ({
	isSignedIn,
	shouldHideReaderRevenue,
	isPaidContent,
	alreadyVisitedCount,
	engagementBannerLastClosedAt,
	subscriptionBannerLastClosedAt,
	signInBannerLastClosedAt,
	countryCode,
	optedOutOfArticleCount,
	asyncArticleCounts,
	sectionId,
	tags,
	contentType,
}: BuildPayloadProps): Promise<BannerPayload> => {
	const articleCounts = await asyncArticleCounts;
	const weeklyArticleHistory = articleCounts?.weeklyArticleHistory;
	const articleCountToday = getArticleCountToday(articleCounts);

	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });

	return {
		tracking: {
			ophanPageId: window.guardian.config.ophan.pageViewId,
			platformId: 'GUARDIAN_WEB',
			clientName: 'dcr',
			referrerUrl: window.location.origin + window.location.pathname,
		},
		targeting: {
			alreadyVisitedCount,
			shouldHideReaderRevenue,
			isPaidContent,
			showSupportMessaging: !shouldHideSupportMessaging(isSignedIn),
			engagementBannerLastClosedAt,
			subscriptionBannerLastClosedAt,
			signInBannerLastClosedAt,
			mvtId: Number(
				getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
			),
			countryCode,
			weeklyArticleHistory,
			articleCountToday,
			hasOptedOutOfArticleCount: optedOutOfArticleCount,
			modulesVersion: MODULES_VERSION,
			sectionId,
			tagIds: tags.map((tag) => tag.id),
			contentType,
			browserId: (await hasCmpConsentForBrowserId())
				? browserId ?? undefined
				: undefined,
			purchaseInfo: getPurchaseInfo(),
			isSignedIn,
			lastOneOffContributionDate: getLastOneOffContributionDate(),
		},
	};
};

export const canShowRRBanner: CanShowFunctionType<BannerProps> = async ({
	remoteBannerConfig,
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
	alreadyVisitedCount,
	engagementBannerLastClosedAt,
	subscriptionBannerLastClosedAt,
	signInBannerLastClosedAt,
	isPreview,
	idApiUrl,
	signInGateWillShow,
	asyncArticleCounts,
}) => {
	if (!remoteBannerConfig) return { show: false };

	if (
		shouldHideReaderRevenue ||
		isPaidContent ||
		isPreview ||
		signInGateWillShow
	) {
		// We never serve Reader Revenue banners in this case
		return { show: false };
	}

	const purchaseInfo = getPurchaseInfo();
	const showSignInPrompt =
		purchaseInfo && !isSignedIn && !signInBannerLastClosedAt;

	const hasForceBannerParam = window.location.search.includes('force-banner');

	if (
		!showSignInPrompt &&
		!hasForceBannerParam &&
		engagementBannerLastClosedAt &&
		subscriptionBannerLastClosedAt &&
		withinLocalNoBannerCachePeriod()
	) {
		return { show: false };
	}

	const countryCode = await asyncCountryCode;
	const optedOutOfArticleCount = await hasOptedOutOfArticleCount();
	const bannerPayload = await buildPayload({
		isSignedIn,
		countryCode,
		contentType,
		sectionId,
		shouldHideReaderRevenue,
		isMinuteArticle,
		isPaidContent,
		tags,
		contributionsServiceUrl,
		isSensitive,
		alreadyVisitedCount,
		engagementBannerLastClosedAt,
		subscriptionBannerLastClosedAt,
		signInBannerLastClosedAt,
		optedOutOfArticleCount,
		asyncArticleCounts,
	});

	const response: ModuleDataResponse = await getBanner(
		contributionsServiceUrl,
		bannerPayload,
	);
	if (!response.data) {
		if (engagementBannerLastClosedAt && subscriptionBannerLastClosedAt) {
			setLocalNoBannerCachePeriod();
		}
		return { show: false };
	}

	const { module, meta } = response.data;

	const fetchEmail = isSignedIn
		? lazyFetchEmailWithTimeout(idApiUrl)
		: undefined;

	return { show: true, meta: { module, meta, fetchEmail } };
};

export const canShowPuzzlesBanner: CanShowFunctionType<BannerProps> = async ({
	remoteBannerConfig,
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
	alreadyVisitedCount,
	engagementBannerLastClosedAt,
	subscriptionBannerLastClosedAt,
	asyncArticleCounts,
}) => {
	const isPuzzlesPage =
		sectionId === 'crosswords' ||
		tags.some((tag) => tag.type === 'Series' && tag.title === 'Sudoku');

	if (shouldHideReaderRevenue) {
		// We never serve Reader Revenue banners in this case
		return { show: false };
	}

	if (isPuzzlesPage && remoteBannerConfig) {
		const countryCode = await asyncCountryCode;
		const optedOutOfArticleCount = await hasOptedOutOfArticleCount();
		const bannerPayload = await buildPayload({
			isSignedIn,
			countryCode,
			contentType,
			sectionId,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			tags,
			contributionsServiceUrl,
			isSensitive,
			alreadyVisitedCount,
			engagementBannerLastClosedAt,
			subscriptionBannerLastClosedAt,
			optedOutOfArticleCount,
			asyncArticleCounts,
		});
		return getPuzzlesBanner(contributionsServiceUrl, bannerPayload).then(
			(response: ModuleDataResponse) => {
				if (!response.data) {
					return { show: false };
				}

				const { module, meta } = response.data;
				return { show: true, meta: { module, meta } };
			},
		);
	}

	return { show: false };
};

export type BannerProps = {
	meta: TestTracking;
	module: ModuleData;
	// eslint-disable-next-line react/no-unused-prop-types -- ESLint is wrong: it is used in ReaderRevenueBanner
	fetchEmail?: () => Promise<string | null>;
};

type RemoteBannerProps = BannerProps & {
	componentTypeName: ReaderRevenueComponentType;
	displayEvent: string;
};

const RemoteBanner = ({
	componentTypeName,
	displayEvent,
	meta,
	module,
	fetchEmail,
}: RemoteBannerProps) => {
	const [Banner, setBanner] = useState<React.ElementType>();

	const [hasBeenSeen, setNode] = useIsInView({
		threshold: 0,
		debounce: true,
	});

	useEffect(() => {
		setAutomat();

		window
			.guardianPolyfilledImport(module.url)
			.then((bannerModule: { [key: string]: JSX.Element }) => {
				setBanner(() => bannerModule[module.name] ?? null); // useState requires functions to be wrapped
			})
			.catch((error) => {
				const msg = `Error importing RR banner: ${String(error)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-banner',
				);
			});
	}, [module]);

	useOnce(() => {
		const { componentType } = meta;

		// track banner view event in Google Analytics for subscriptions banner
		if (componentType === componentTypeName) {
			trackNonClickInteraction(displayEvent);
		}
	}, [hasBeenSeen, meta]);

	if (Banner !== undefined) {
		return (
			// The css here is necessary to put the container div in view, so that we can track the view
			<div
				ref={setNode}
				css={css`
					width: 100%;
					${getZIndex('banner')}
				`}
			>
				{}
				<Banner
					{...module.props}
					submitComponentEvent={submitComponentEvent}
					fetchEmail={fetchEmail}
				/>
			</div>
		);
	}

	return null;
};

export const ReaderRevenueBanner = ({
	meta,
	module,
	fetchEmail,
}: BannerProps) => (
	<RemoteBanner
		componentTypeName="ACQUISITIONS_SUBSCRIPTIONS_BANNER"
		displayEvent="subscription-banner : display"
		meta={meta}
		module={module}
		fetchEmail={fetchEmail}
	/>
);

export const PuzzlesBanner = ({ meta, module }: BannerProps) => (
	<RemoteBanner
		componentTypeName="ACQUISITIONS_OTHER"
		displayEvent="puzzles-banner : display"
		meta={meta}
		module={module}
	/>
);
