import React, { useState, useEffect } from 'react';
import { cmp } from '@guardian/consent-management-platform';
import {
    canShow as canShowRRBanner,
    ReaderRevenueBanner,
} from '@root/src/web/components/StickyBottomBanner/ReaderRevenueBanner';
import { getAlreadyVisitedCount } from '@root/src/web/lib/alreadyVisited';
import { pickBanner, BannerConfig, MaybeFC, Banner } from './bannerPicker';
import { BrazeBanner, canShow as canShowBrazeBanner } from './BrazeBanner';

type Props = {
    isSignedIn?: boolean;
    asyncCountryCode?: Promise<string>;
    CAPI: CAPIBrowserType;
    asyncBrazeUuid?: Promise<null | string>;
    shouldHideSupportMessaging?: boolean;
};

type FulfilledProps = {
    isSignedIn: boolean;
    asyncCountryCode: Promise<string>;
    CAPI: CAPIBrowserType;
    asyncBrazeUuid: Promise<null | string>;
    shouldHideSupportMessaging: boolean;
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

const StickyBottomBannerWithFullfilledDependencies = ({
    isSignedIn,
    asyncCountryCode,
    CAPI,
    asyncBrazeUuid,
    shouldHideSupportMessaging,
}: FulfilledProps) => {
    const [SelectedBanner, setSelectedBanner] = useState<React.FC | null>(null);

    useEffect(() => {
        const CMP = buildCmpBannerConfig();
        const readerRevenue = buildReaderRevenueBannerConfig(
            CAPI,
            isSignedIn,
            asyncCountryCode,
        );
        const brazeBanner = buildBrazeBanner(
            asyncBrazeUuid,
            shouldHideSupportMessaging,
        );
        const bannerConfig: BannerConfig = [CMP, readerRevenue, brazeBanner];

        pickBanner(bannerConfig).then((PickedBanner: () => MaybeFC) =>
            setSelectedBanner(PickedBanner),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array because we only want this to run once

    if (SelectedBanner) {
        return <SelectedBanner />;
    }

    return null;
};

// This outer component exists because we don't want to run the banner picker
// until all of our dependencies are defined. Then when they are all defined we
// only want to run the banner picker once.
export const StickyBottomBanner = ({
    isSignedIn,
    asyncCountryCode,
    CAPI,
    asyncBrazeUuid,
    shouldHideSupportMessaging,
}: Props) => {
    if (
        isSignedIn === undefined ||
        asyncCountryCode === undefined ||
        asyncBrazeUuid === undefined ||
        shouldHideSupportMessaging === undefined
    ) {
        return null;
    }

    return (
        <StickyBottomBannerWithFullfilledDependencies
            isSignedIn={isSignedIn}
            asyncCountryCode={asyncCountryCode}
            asyncBrazeUuid={asyncBrazeUuid}
            shouldHideSupportMessaging={shouldHideSupportMessaging}
            CAPI={CAPI}
        />
    );
};
