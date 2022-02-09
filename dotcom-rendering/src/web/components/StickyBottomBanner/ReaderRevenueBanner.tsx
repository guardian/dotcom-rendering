import { useState } from 'react';
import { css } from '@emotion/react';

import { getCookie } from '@guardian/libs';
import {
	getBanner,
	getPuzzlesBanner,
} from '@guardian/support-dotcom-components';
import {
	ModuleData,
	ModuleDataResponse,
	BannerPayload,
	WeeklyArticleHistory,
} from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useHasBeenSeen } from '../../lib/useHasBeenSeen';
import {
	shouldHideSupportMessaging,
	withinLocalNoBannerCachePeriod,
	setLocalNoBannerCachePeriod,
	MODULES_VERSION,
	hasOptedOutOfArticleCount,
	lazyFetchEmailWithTimeout,
} from '../../lib/contributions';
import { submitComponentEvent } from '../../browser/ophan/ophan';
import { getZIndex } from '../../lib/getZIndex';
import { trackNonClickInteraction } from '../../browser/ga/ga';
import { CanShowResult } from '../../lib/messagePicker';
import { setAutomat } from '../../lib/setAutomat';
import { useOnce } from '../../lib/useOnce';

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
	weeklyArticleHistory?: WeeklyArticleHistory;
};

type BuildPayloadProps = BaseProps & {
	countryCode: string;
	optedOutOfArticleCount: boolean;
	asyncArticleCount: Promise<WeeklyArticleHistory | undefined>;
};

type CanShowProps = BaseProps & {
	asyncCountryCode: Promise<string>;
	remoteBannerConfig: boolean;
	section: string;
	isPreview: boolean;
	idApiUrl: string;
	signInGateWillShow: boolean;
	asyncArticleCount: Promise<WeeklyArticleHistory | undefined>;
};

type ReaderRevenueComponentType =
	| 'ACQUISITIONS_SUBSCRIPTIONS_BANNER'
	| 'ACQUISITIONS_OTHER';

export type CanShowFunctionType<T> = (
	props: CanShowProps,
) => Promise<CanShowResult<T>>;

const buildPayload = async ({
	isSignedIn,
	shouldHideReaderRevenue,
	isPaidContent,
	alreadyVisitedCount,
	engagementBannerLastClosedAt,
	subscriptionBannerLastClosedAt,
	countryCode,
	optedOutOfArticleCount,
	asyncArticleCount,
	sectionId,
	tags,
}: BuildPayloadProps): Promise<BannerPayload> => {
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
			mvtId: Number(
				getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
			),
			countryCode,
			weeklyArticleHistory: await asyncArticleCount,
			hasOptedOutOfArticleCount: optedOutOfArticleCount,
			modulesVersion: MODULES_VERSION,
			sectionId,
			tagIds: tags.map((tag) => tag.id),
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
	isPreview,
	idApiUrl,
	signInGateWillShow,
	asyncArticleCount,
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

	if (
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
		optedOutOfArticleCount,
		asyncArticleCount,
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
	section,
	asyncArticleCount,
}) => {
	const isPuzzlesPage =
		section === 'crosswords' ||
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
			asyncArticleCount,
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
	meta: any;
	module: ModuleData;
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
	const [Banner, setBanner] = useState<React.FC>();

	const [hasBeenSeen, setNode] = useHasBeenSeen({
		threshold: 0,
		debounce: true,
	});

	useOnce(() => {
		if (module === undefined || meta === undefined) {
			return;
		}

		setAutomat();

		window
			.guardianPolyfilledImport(module.url)
			.then((bannerModule: { [key: string]: JSX.Element }) => {
				setBanner(() => bannerModule[module.name]); // useState requires functions to be wrapped
			})
			.catch((error) => {
				const msg = `Error importing RR banner: ${error}`;
				// eslint-disable-next-line no-console
				console.log(msg);
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-banner',
				);
			});
	}, []);

	useOnce(() => {
		const { componentType } = meta;

		// track banner view event in Google Analytics for subscriptions banner
		if (componentType === componentTypeName) {
			trackNonClickInteraction(displayEvent);
		}
	}, [hasBeenSeen, meta]);

	if (Banner) {
		return (
			// The css here is necessary to put the container div in view, so that we can track the view
			<div
				ref={setNode}
				css={css`
					width: 100%;
					${getZIndex('banner')}
				`}
			>
				{/* eslint-disable react/jsx-props-no-spreading */}
				<Banner
					{...module.props}
					// @ts-ignore
					submitComponentEvent={submitComponentEvent}
					fetchEmail={fetchEmail}
				/>
				{/* eslint-enable react/jsx-props-no-spreading */}
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
