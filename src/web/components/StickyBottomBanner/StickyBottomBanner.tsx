import React, { useState, useEffect } from 'react';
import { cmp } from '@guardian/consent-management-platform';

import {
	canShow as canShowRRBanner,
	ReaderRevenueBanner,
} from '@root/src/web/components/StickyBottomBanner/ReaderRevenueBanner';
import { getAlreadyVisitedCount } from '@root/src/web/lib/alreadyVisited';
import { getCookie } from '@root/src/web/browser/cookie';
import { getBrazeUuid } from '@root/src/web/lib/getBrazeUuid';
import { useOnce } from '@root/src/web/lib/useOnce';

import { pickBanner, BannerConfig, MaybeFC, Banner } from './bannerPicker';
import { BrazeBanner, canShow as canShowBrazeBanner } from './BrazeBanner';

type Props = {
	isSignedIn?: boolean;
	asyncCountryCode?: Promise<string>;
	CAPI: CAPIBrowserType;
	idApiUrl: string;
};

const getBannerLastClosedAt = (key: string): string | undefined => {
	const item = localStorage.getItem(`gu.prefs.${key}`);
	return (item && JSON.parse(item).value) || undefined;
};

const DEFAULT_BANNER_TIMEOUT_MILLIS = 2000;

const buildCmpBannerConfig = (): Banner => ({
	id: 'cmpUi',
	canShow: () =>
		cmp.willShowPrivacyMessage().then((result) => ({ result: !!result })),
	show: () => {
		// New CMP is not a react component and is shown outside of react's world
		// so render nothing if it will show
		return null;
	},
	timeoutMillis: null,
});

const buildReaderRevenueBannerConfig = (
	CAPI: CAPIBrowserType,
	isSignedIn: boolean,
	asyncCountryCode: Promise<string>,
): Banner => {
	return {
		id: 'reader-revenue-banner',
		canShow: () =>
			canShowRRBanner({
				remoteBannerConfig: CAPI.config.remoteBanner,
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
			}),
		/* eslint-disable-next-line react/jsx-props-no-spreading */
		show: (meta: any) => () => <ReaderRevenueBanner {...meta} />,
		timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
	};
};

const buildBrazeBanner = (
	asyncBrazeUuid: Promise<null | string>,
	shouldHideSupportMessaging: undefined | boolean,
): Banner => ({
	id: 'braze-banner',
	canShow: () =>
		canShowBrazeBanner(asyncBrazeUuid, shouldHideSupportMessaging),
	show: (meta: any) => () => <BrazeBanner meta={meta} />,
	timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
});

export const StickyBottomBanner = ({
	isSignedIn,
	asyncCountryCode,
	CAPI,
	idApiUrl,
}: Props) => {
	const [SelectedBanner, setSelectedBanner] = useState<React.FC | null>(null);
	const [
		shouldHideSupportMessaging,
		setShouldHideSupportMessaging,
	] = useState<boolean>();
	const [asyncBrazeUuid, setAsyncBrazeUuid] = useState<
		Promise<string | null>
	>();

	useEffect(() => {
		setShouldHideSupportMessaging(
			getCookie('gu_hide_support_messaging') === 'true',
		);
	}, []);

	useOnce(() => {
		if (isSignedIn) {
			setAsyncBrazeUuid(getBrazeUuid(idApiUrl));
		} else {
			setAsyncBrazeUuid(Promise.resolve(null));
		}
	}, [isSignedIn, idApiUrl]);

	useOnce(() => {
		const CMP = buildCmpBannerConfig();
		const readerRevenue = buildReaderRevenueBannerConfig(
			CAPI,
			isSignedIn || false,
			asyncCountryCode || Promise.resolve('GB'),
		);
		const brazeBanner = buildBrazeBanner(
			asyncBrazeUuid || Promise.resolve(null),
			shouldHideSupportMessaging,
		);
		const bannerConfig: BannerConfig = [CMP, readerRevenue, brazeBanner];

		pickBanner(bannerConfig).then((PickedBanner: () => MaybeFC) =>
			setSelectedBanner(PickedBanner),
		);
	}, [
		isSignedIn,
		asyncCountryCode,
		asyncBrazeUuid,
		shouldHideSupportMessaging,
		CAPI,
	]);

	if (SelectedBanner) {
		return <SelectedBanner />;
	}

	return null;
};
