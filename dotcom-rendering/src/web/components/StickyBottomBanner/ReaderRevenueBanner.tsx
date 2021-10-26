import { useState } from 'react';
import { css } from '@emotion/react';

import { useHasBeenSeen } from '@root/src/web/lib/useHasBeenSeen';
import {
	shouldHideSupportMessaging,
	withinLocalNoBannerCachePeriod,
	setLocalNoBannerCachePeriod,
	MODULES_VERSION,
	hasOptedOutOfArticleCount,
	getEmail,
} from '@root/src/web/lib/contributions';
import { getCookie } from '@root/src/web/browser/cookie';
import {
	submitComponentEvent,
} from '@root/src/web/browser/ophan/ophan';
import { getZIndex } from '@root/src/web/lib/getZIndex';
import { trackNonClickInteraction } from '@root/src/web/browser/ga/ga';
import { WeeklyArticleHistory } from '@guardian/automat-contributions/dist/lib/types';
import { getForcedVariant } from '@root/src/web/lib/readerRevenueDevUtils';
import { CanShowResult } from '@root/src/web/lib/messagePicker';
import { setAutomat } from '@root/src/web/lib/setAutomat';
import { useOnce } from '@root/src/web/lib/useOnce';

type BaseProps = {
	isSignedIn: boolean;
	contentType: string;
	sectionName?: string;
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

// TODO specify return type (need to update client to provide this first)
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
}: BuildPayloadProps) => {
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
			mvtId: Number(getCookie('GU_mvt_id')),
			countryCode,
			weeklyArticleHistory: await asyncArticleCount,
			optedOutOfArticleCount,
			modulesVersion: MODULES_VERSION,
		},
	};
};

// TODO replace this with an imported version from the client lib
const getBanner = (meta: { [key: string]: any }, url: string): Promise<any> => {
	const json = JSON.stringify(meta);
	return fetch(url, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: json,
	})
		.then((response: Response) => {
			if (!response.ok) {
				throw Error(
					response.statusText ||
						`SlotBanner | An api call returned HTTP status ${response.status}`,
				);
			}
			return response;
		})
		.then((response) => response.json());
};

export const canShowRRBanner: CanShowFunctionType<BannerProps> = async ({
	remoteBannerConfig,
	isSignedIn,
	asyncCountryCode,
	contentType,
	sectionName,
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
		sectionName,
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
	const forcedVariant = getForcedVariant('banner');
	const queryString = forcedVariant ? `?force=${forcedVariant}` : '';

	const json: { data?: any } = await getBanner(
		bannerPayload,
		`${contributionsServiceUrl}/banner${queryString}`,
	);
	if (!json.data) {
		if (engagementBannerLastClosedAt && subscriptionBannerLastClosedAt) {
			setLocalNoBannerCachePeriod();
		}
		return { show: false };
	}

	const { module, meta } = json.data;

	const email = isSignedIn ? await getEmail(idApiUrl) : undefined;

	return { show: true, meta: { module, meta, email } };
};

export const canShowPuzzlesBanner: CanShowFunctionType<BannerProps> = async ({
	remoteBannerConfig,
	isSignedIn,
	asyncCountryCode,
	contentType,
	sectionName,
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
			sectionName,
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
		return getBanner(
			bannerPayload,
			`${contributionsServiceUrl}/puzzles`,
		).then((json: { data?: any }) => {
			if (!json.data) {
				return { show: false };
			}

			const { module, meta } = json.data;

			return { show: true, meta: { module, meta } };
		});
	}

	return { show: false };
};

export type BannerProps = {
	meta: any;
	module: { url: string; name: string; props: any[] };
	email?: string;
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
	email,
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
					email={email}
				/>
				{/* eslint-enable react/jsx-props-no-spreading */}
			</div>
		);
	}

	return null;
};

export const ReaderRevenueBanner = ({ meta, module, email }: BannerProps) => (
	<RemoteBanner
		componentTypeName="ACQUISITIONS_SUBSCRIPTIONS_BANNER"
		displayEvent="subscription-banner : display"
		meta={meta}
		module={module}
		email={email}
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
