import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import type { CountryCode } from '@guardian/libs';
import { cmp, isString, isUndefined, storage } from '@guardian/libs';
import type { ModuleData } from '@guardian/support-dotcom-components/dist/dotcom/types';
import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useState } from 'react';
import type { ArticleCounts } from '../lib/articleCount';
import { getArticleCounts } from '../lib/articleCount';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker';
import { pickMessage } from '../lib/messagePicker';
import { useAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useBraze } from '../lib/useBraze';
import { useCountryCode } from '../lib/useCountryCode';
import { usePageViewId } from '../lib/usePageViewId';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import type { AuxiaGateDisplayData } from './SignInGate/types';
import {
	BrazeBanner,
	canShowBrazeBanner,
} from './StickyBottomBanner/BrazeBanner';
import {
	canShowRRBanner,
	ReaderRevenueBanner,
} from './StickyBottomBanner/ReaderRevenueBanner';
import type { CanShowFunctionType } from './StickyBottomBanner/ReaderRevenueBanner';
import type { CanShowSignInGateProps } from './StickyBottomBanner/SignInGatePortal';
import {
	canShowSignInGatePortal,
	SignInGatePortal,
} from './StickyBottomBanner/SignInGatePortal';

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
	host?: string;
};

type BrazeMeta = {
	dataFromBraze: { [key: string]: string };
	logImpressionWithBraze: () => void;
	logButtonClickWithBraze: (id: number) => void;
};

type RRBannerConfig = {
	id: string;
	BannerComponent: typeof ReaderRevenueBanner;
	canShowFn: CanShowFunctionType<ModuleData<BannerProps>>;
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
				), // Intentionally there is no catch block because if the CMP fails no other banner can be displayed.
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
		contentType,
		sectionId,
		shouldHideReaderRevenue,
		isMinuteArticle,
		isPaidContent,
		isSensitive,
		tags,
		contributionsServiceUrl,
		idApiUrl,
		renderingTarget,
		ophanPageViewId,
		pageId,
	}: {
		isSignedIn: boolean;
		countryCode: CountryCode;
		isPreview: boolean;
		asyncArticleCounts: Promise<ArticleCounts | undefined>;
		contentType: string;
		sectionId: string;
		shouldHideReaderRevenue: boolean;
		isMinuteArticle: boolean;
		isPaidContent: boolean;
		isSensitive: boolean;
		tags: TagType[];
		contributionsServiceUrl: string;
		idApiUrl: string;
		renderingTarget: RenderingTarget;
		ophanPageViewId: string;
		pageId?: string;
	}): CandidateConfig<ModuleData<BannerProps>> => {
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
						abandonedBasketBannerLastClosedAt:
							getBannerLastClosedAt(
								'abandonedBasketLastClosedAt',
							),
						isPreview,
						idApiUrl,
						renderingTarget,
						asyncArticleCounts,
						ophanPageViewId,
						pageId,
					}),
				show:
					({ name, props }: ModuleData<BannerProps>) =>
					() => <BannerComponent name={name} props={props} />,
			},
			timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
		};
	};
};

const buildSignInGateConfig = (
	canShowProps: CanShowSignInGateProps,
	host?: string,
): CandidateConfig<AuxiaGateDisplayData> => ({
	candidate: {
		id: 'sign-in-gate-portal',
		canShow: async () => {
			return await canShowSignInGatePortal(canShowProps);
		},
		show: (meta: AuxiaGateDisplayData) => () => (
			<SignInGatePortal
				host={host}
				isPaidContent={canShowProps.isPaidContent}
				isPreview={canShowProps.isPreview}
				pageId={canShowProps.pageId}
				contributionsServiceUrl={canShowProps.contributionsServiceUrl}
				auxiaGateDisplayData={meta}
			/>
		),
	},
	timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
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
): CandidateConfig<BrazeMeta> => ({
	candidate: {
		id: 'braze-banner',
		canShow: () =>
			canShowBrazeBanner(
				brazeMessages,
				brazeArticleContext,
				tags,
				shouldHideReaderRevenue,
			),
		show: (meta: BrazeMeta) => () => (
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
	host,
}: Props & {
	remoteBannerSwitch: boolean;
	isSensitive: boolean;
}) => {
	const { renderingTarget, editionId } = useConfig();
	const { brazeMessages } = useBraze(idApiUrl, renderingTarget);

	const countryCode = useCountryCode('sticky-bottom-banner');
	const isSignedIn = useIsSignedIn();
	const ophanPageViewId = usePageViewId(renderingTarget);
	const abTestAPI = useAB()?.api;
	const isInAuxiaControlGroup = !!abTestAPI?.isUserInVariant(
		'NoAuxiaSignInGate',
		'control',
	);

	const [SelectedBanner, setSelectedBanner] = useState<MaybeFC | null>(null);
	const [asyncArticleCounts, setAsyncArticleCounts] =
		useState<Promise<ArticleCounts | undefined>>();

	useEffect(() => {
		setAsyncArticleCounts(getArticleCounts(pageId, tags, contentType));
	}, [contentType, tags, pageId]);

	useEffect(() => {
		// Wait for the following dependencies before checking for CMP, Braze + RRCP messages
		if (
			isUndefined(countryCode) ||
			isUndefined(isSignedIn) ||
			isUndefined(brazeMessages) ||
			isUndefined(asyncArticleCounts) ||
			isUndefined(ophanPageViewId) ||
			isSignedIn === 'Pending'
		) {
			return;
		}
		const CMP = buildCmpBannerConfig();

		const readerRevenue = buildReaderRevenueBannerConfig(
			remoteBannerSwitch,
		)({
			isSignedIn,
			countryCode,
			isPreview,
			asyncArticleCounts,
			contentType,
			sectionId,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			isSensitive,
			tags,
			contributionsServiceUrl,
			idApiUrl,
			renderingTarget,
			ophanPageViewId,
			pageId,
		});
		const brazeArticleContext: BrazeArticleContext = {
			section: sectionId,
		};
		const brazeBanner = buildBrazeBanner(
			brazeMessages,
			brazeArticleContext,
			idApiUrl,
			tags,
			shouldHideReaderRevenue,
		);

		const signInGate = buildSignInGateConfig(
			{
				isSignedIn,
				isPaidContent,
				isPreview,
				contentType,
				sectionId,
				tags,
				pageId,
				contributionsServiceUrl,
				editionId,
				isInAuxiaControlGroup,
			},
			host,
		);

		// Check both window.location.search and the full URL for force-banner parameter
		// This handles cases where the local dev server has a different URL structure
		const fullUrl = window.location.href;
		const hasForceBannerParam =
			window.location.search.includes('force-banner') ||
			fullUrl.includes('force-banner');
		const hasForceBrazeMessageParam = window.location.hash.includes(
			'force-braze-message',
		);

		let candidates: SlotConfig['candidates'];

		if (hasForceBannerParam) {
			candidates = [CMP, readerRevenue];
		} else if (hasForceBrazeMessageParam) {
			candidates = [CMP, brazeBanner];
		} else {
			candidates = [CMP, signInGate, brazeBanner, readerRevenue];
		}

		const bannerConfig: SlotConfig = {
			candidates,
			name: 'banner',
		};

		pickMessage(bannerConfig, renderingTarget)
			.then((PickedBanner: () => MaybeFC) =>
				setSelectedBanner(PickedBanner),
			)
			.catch((e) => {
				// Report error to Sentry
				const msg = `StickyBottomBanner pickMessage - error: ${String(
					e,
				)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'sticky-bottom-banner',
				);
			});
	}, [
		isSignedIn,
		countryCode,
		brazeMessages,
		asyncArticleCounts,
		contentType,
		contributionsServiceUrl,
		editionId,
		idApiUrl,
		isMinuteArticle,
		isPaidContent,
		isPreview,
		isSensitive,
		remoteBannerSwitch,
		renderingTarget,
		sectionId,
		shouldHideReaderRevenue,
		tags,
		ophanPageViewId,
		pageId,
		host,
		isInAuxiaControlGroup,
	]);

	if (SelectedBanner) {
		return <SelectedBanner />;
	}

	return null;
};
