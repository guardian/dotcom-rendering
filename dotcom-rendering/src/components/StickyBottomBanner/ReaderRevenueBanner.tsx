import { css } from '@emotion/react';
import type { ConsentState, CountryCode } from '@guardian/libs';
import { getCookie, onConsent } from '@guardian/libs';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import {
	abandonedBasketSchema,
	getBanner,
} from '@guardian/support-dotcom-components';
import type {
	BannerPayload,
	ModuleData,
	ModuleDataResponse,
} from '@guardian/support-dotcom-components/dist/dotcom/types';
import type {
	AbandonedBasket,
	BannerProps,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../../client/ophan/ophan';
import type { ArticleCounts } from '../../lib/articleCount';
import {
	getPurchaseInfo,
	hasOptedOutOfArticleCount,
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
import type { RenderingTarget } from '../../types/renderingTarget';
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
	pageId?: string;
};

type BuildPayloadProps = BaseProps & {
	countryCode: string;
	optedOutOfArticleCount: boolean;
	asyncArticleCounts: Promise<ArticleCounts | undefined>;
	userConsent: boolean;
	hideSupportMessagingForUser: boolean;
};

type CanShowProps = BaseProps & {
	countryCode: CountryCode;
	remoteBannerConfig: boolean;
	isPreview: boolean;
	idApiUrl: string;
	signInGateWillShow: boolean;
	asyncArticleCounts: Promise<ArticleCounts | undefined>;
	renderingTarget: RenderingTarget;
	ophanPageViewId: string;
};

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
	hideSupportMessagingForUser,
	pageId,
}: BuildPayloadProps): Promise<BannerPayload> => {
	const articleCounts = await asyncArticleCounts;
	const weeklyArticleHistory = articleCounts?.weeklyArticleHistory;
	const articleCountToday = getArticleCountToday(articleCounts);

	return {
		targeting: {
			shouldHideReaderRevenue,
			isPaidContent,
			showSupportMessaging: !hideSupportMessagingForUser,
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
			sectionId,
			tagIds: tags.map((tag) => tag.id),
			contentType,
			purchaseInfo: getPurchaseInfo(),
			isSignedIn,
			hasConsented: userConsent,
			abandonedBasket: parseAbandonedBasket(
				getCookie({ name: 'GU_CO_INCOMPLETE', shouldMemoize: true }),
			),
			pageId,
		},
	};
};

export const canShowRRBanner: CanShowFunctionType<
	ModuleData<BannerProps>
> = async ({
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
	renderingTarget,
	signInGateWillShow,
	asyncArticleCounts,
	ophanPageViewId,
	pageId,
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

	const hideSupportMessagingForUser = shouldHideSupportMessaging(isSignedIn);
	if (hideSupportMessagingForUser === 'Pending') {
		// We don't yet know the user's supporter status
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
		hideSupportMessagingForUser,
		pageId,
	});

	const response: ModuleDataResponse<BannerProps> = await getBanner(
		contributionsServiceUrl,
		bannerPayload,
	);
	if (!response.data) {
		if (engagementBannerLastClosedAt && subscriptionBannerLastClosedAt) {
			setLocalNoBannerCachePeriod();
		}
		return { show: false };
	}

	const { module } = response.data;

	const { props, name } = module;

	const fetchEmail = isSignedIn ? lazyFetchEmailWithTimeout() : undefined;

	const tracking: Tracking = {
		...props.tracking,
		ophanPageId: ophanPageViewId,
		platformId: 'GUARDIAN_WEB',
		referrerUrl: window.location.origin + window.location.pathname,
	};
	const enrichedProps: BannerProps = {
		...props,
		tracking,
		fetchEmail,
		submitComponentEvent: (componentEvent: ComponentEvent) =>
			submitComponentEvent(componentEvent, renderingTarget),
	};

	return {
		show: true,
		meta: {
			props: enrichedProps,
			name,
		},
	};
};

export const ReaderRevenueBanner = ({
	name,
	props,
}: ModuleData<BannerProps>) => {
	const [Banner, setBanner] = useState<React.ElementType | null>(null);

	useEffect(() => {
		setAutomat();

		(name === 'SignInPromptBanner'
			? /* webpackChunkName: "sign-in-prompt-banner" */
			  import(`../marketing/banners/signInPrompt/SignInPromptBanner`)
			: name === 'DesignableBannerV2'
			? /* webpackChunkName: "designable-banner-v2" */
			  import(`../marketing/banners/designableBanner/DesignableBannerV2`)
			: /* webpackChunkName: "designable-banner" */
			  import(`../marketing/banners/designableBanner/DesignableBannerV2`)
		)
			.then((bannerModule: { [key: string]: React.ElementType }) => {
				setBanner(() => bannerModule[name] ?? null);
			})
			.catch((error) => {
				const msg = `Error importing RR banner: ${String(error)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-banner',
				);
			});
	}, [name]);

	if (Banner !== null) {
		return (
			// The css here is necessary to put the container div in view, so that we can track the view
			<div
				css={css`
					width: 100%;
					z-index: ${getZIndex('banner')};
				`}
			>
				{}
				<Banner {...props} />
			</div>
		);
	}

	return null;
};
