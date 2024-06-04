import { css } from '@emotion/react';
import type { ConsentState, CountryCode } from '@guardian/libs';
import { getCookie, onConsent } from '@guardian/libs';
import {
	abandonedBasketSchema,
	getBanner,
} from '@guardian/support-dotcom-components';
import type {
	BannerPayload,
	ModuleData,
	ModuleDataResponse,
} from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import type { AbandonedBasket } from '@guardian/support-dotcom-components/dist/shared/src/types';
import type { TestTracking } from '@guardian/support-dotcom-components/dist/shared/src/types/abTests/shared';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../../client/ophan/ophan';
import type { ArticleCounts } from '../../lib/articleCount';
import {
	getLastOneOffContributionDate,
	getPurchaseInfo,
	hasCmpConsentForBrowserId,
	hasOptedOutOfArticleCount,
	MODULES_VERSION,
	recentlyClosedBanner,
	setLocalNoBannerCachePeriod,
	shouldHideSupportMessaging,
	withinLocalNoBannerCachePeriod,
} from '../../lib/contributions';
import { getToday } from '../../lib/dailyArticleCount';
import { lazyFetchEmailWithTimeout } from '../../lib/fetchEmail';
import { getZIndex } from '../../lib/getZIndex';
import type { CanShowResult } from '../../lib/messagePicker';
import { setAutomat } from '../../lib/setAutomat';
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
	engagementBannerLastClosedAt?: string;
	subscriptionBannerLastClosedAt?: string;
	signInBannerLastClosedAt?: string;
	abandonedBasketBannerLastClosedAt?: string;
};

type BuildPayloadProps = BaseProps & {
	countryCode: string;
	optedOutOfArticleCount: boolean;
	asyncArticleCounts: Promise<ArticleCounts | undefined>;
	userConsent: boolean;
};

type CanShowProps = BaseProps & {
	countryCode: CountryCode;
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

function parseAbandonedBasket(
	cookie: string | null,
): AbandonedBasket | undefined {
	if (!cookie) return;

	const parsedResult = abandonedBasketSchema.safeParse(JSON.parse(cookie));
	if (!parsedResult.success) {
		const errorMessage = parsedResult.error.message;
		window.guardian.modules.sentry.reportError(
			new Error(errorMessage),
			'rr-banner',
		);

		return;
	}

	return parsedResult.data;
}

export const hasRequiredConsents = (): Promise<boolean> =>
	onConsent()
		.then(({ canTarget }: ConsentState) => canTarget)
		.catch(() => false);

const buildPayload = async ({
	isSignedIn,
	shouldHideReaderRevenue,
	isPaidContent,
	engagementBannerLastClosedAt,
	subscriptionBannerLastClosedAt,
	signInBannerLastClosedAt,
	abandonedBasketBannerLastClosedAt,
	countryCode,
	optedOutOfArticleCount,
	asyncArticleCounts,
	sectionId,
	tags,
	contentType,
	userConsent,
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
			shouldHideReaderRevenue,
			isPaidContent,
			showSupportMessaging: !shouldHideSupportMessaging(isSignedIn),
			engagementBannerLastClosedAt,
			subscriptionBannerLastClosedAt,
			signInBannerLastClosedAt,
			abandonedBasketBannerLastClosedAt,
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
			hasConsented: userConsent,
			abandonedBasket: parseAbandonedBasket(
				getCookie({ name: 'GU_CO_INCOMPLETE', shouldMemoize: true }),
			),
		},
	};
};

export const canShowRRBanner: CanShowFunctionType<BannerProps> = async ({
	remoteBannerConfig,
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
	engagementBannerLastClosedAt,
	subscriptionBannerLastClosedAt,
	signInBannerLastClosedAt,
	abandonedBasketBannerLastClosedAt,
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

	if (!showSignInPrompt && !hasForceBannerParam) {
		// Don't show a banner if one was closed recently. This is to improve user experience by not showing banners on consecutive pageviews
		if (
			recentlyClosedBanner(engagementBannerLastClosedAt) ||
			recentlyClosedBanner(subscriptionBannerLastClosedAt)
		) {
			return { show: false };
		}
		// Don't ask the API for a banner again if it's recently told us not to show one. This is an optimisation to reduce traffic to the API
		if (
			engagementBannerLastClosedAt &&
			subscriptionBannerLastClosedAt &&
			withinLocalNoBannerCachePeriod()
		) {
			return { show: false };
		}
	}

	//Send user consent status to the banner API
	const userConsent = await hasRequiredConsents();

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
		engagementBannerLastClosedAt,
		subscriptionBannerLastClosedAt,
		signInBannerLastClosedAt,
		abandonedBasketBannerLastClosedAt,
		optedOutOfArticleCount,
		asyncArticleCounts,
		userConsent,
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

export type BannerProps = {
	meta: TestTracking;
	module: ModuleData;

	fetchEmail?: () => Promise<string | null>;
};

type RemoteBannerProps = BannerProps & {
	componentTypeName: ReaderRevenueComponentType;
	displayEvent: string;
};

const RemoteBanner = ({ module, fetchEmail }: RemoteBannerProps) => {
	const [Banner, setBanner] = useState<React.ElementType>();

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

	if (Banner !== undefined) {
		return (
			// The css here is necessary to put the container div in view, so that we can track the view
			<div
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
