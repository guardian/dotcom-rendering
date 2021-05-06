import React, { useState } from 'react';
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
import { CountryCode } from '@guardian/libs/dist/esm/types/countries';
import type { BrazeMessagesInterface } from '@guardian/braze-components/logic';
import { BrazeBanner, canShow as canShowBrazeBanner } from './BrazeBanner';

type Props = {
	isSignedIn?: boolean;
	asyncCountryCode?: Promise<CountryCode | null>;
	CAPI: CAPIBrowserType;
	brazeMessages?: Promise<BrazeMessagesInterface>;
};

type RRBannerConfig = {
	id: string;
	BannerComponent: React.FC<BannerProps>;
	canShowFn: CanShowFunctionType;
	isEnabled: (switches: CAPIType['config']['switches']) => boolean;
};

const getBannerLastClosedAt = (key: string): string | undefined => {
	const item = localStorage.getItem(`gu.prefs.${key}`) as undefined | string;

	if (item) {
		const parsedItem = JSON.parse(item) as { [key: string]: any };
		return parsedItem.value;
	}
};

const DEFAULT_BANNER_TIMEOUT_MILLIS = 2000;

const buildCmpBannerConfig = (): CandidateConfig => ({
	candidate: {
		id: 'cmpUi',
		canShow: () =>
			cmp
				.willShowPrivacyMessage()
				.then((result) => ({ result: !!result })),
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
	): CandidateConfig => {
		return {
			candidate: {
				id,
				canShow: () =>
					canShowFn({
						remoteBannerConfig: isEnabled(CAPI.config.switches),
						isSignedIn,
						asyncCountryCode,
						contentType: CAPI.contentType,
						sectionName: CAPI.sectionName,
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
					}),
				show: ({ meta, module }: BannerProps) => () => (
					<BannerComponent meta={meta} module={module} />
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
	isEnabled: (swtiches) => swtiches.puzzlesBanner,
});

const buildReaderRevenueBannerConfig = buildRRBannerConfigWith({
	id: 'reader-revenue-banner',
	BannerComponent: ReaderRevenueBanner,
	canShowFn: canShowRRBanner,
	isEnabled: (swtiches) => swtiches.remoteBanner,
});

const buildBrazeBanner = (
	brazeMessages: Promise<BrazeMessagesInterface>,
): CandidateConfig => ({
	candidate: {
		id: 'braze-banner',
		canShow: () => canShowBrazeBanner(brazeMessages),
		show: (meta: any) => () => <BrazeBanner meta={meta} />,
	},
	timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
});

export const StickyBottomBanner = ({
									   isSignedIn,
									   asyncCountryCode,
									   CAPI,
									   brazeMessages,
								   }: Props) => {
	const [SelectedBanner, setSelectedBanner] = useState<React.FC | null>(null);
	useOnce(() => {
		const CMP = buildCmpBannerConfig();
		const puzzlesBanner = buildPuzzlesBannerConfig(
			CAPI,
			isSignedIn as boolean,
			asyncCountryCode as Promise<string>,
		);
		const readerRevenue = buildReaderRevenueBannerConfig(
			CAPI,
			isSignedIn as boolean,
			asyncCountryCode as Promise<CountryCode>,
		);
		const brazeBanner = buildBrazeBanner(
			brazeMessages as Promise<BrazeMessagesInterface>,
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
	}, [isSignedIn, asyncCountryCode, CAPI, brazeMessages]);

	if (SelectedBanner) {
		return <SelectedBanner />;
	}

	return null;
};
