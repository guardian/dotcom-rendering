import React, { useState, useEffect } from 'react';
import {
    willShowCMP,
    shouldShowOldCMP,
    CMP,
} from '@root/src/web/components/StickyBottomBanner/CMP';
import {
    canShow as canShowRRBanner,
    ReaderRevenueBanner,
} from '@root/src/web/components/StickyBottomBanner/ReaderRevenueBanner';
import { getAlreadyVisitedCount } from '@root/src/web/lib/alreadyVisited';
import { pickBanner, BannerConfig, MaybeFC, Banner } from './bannerPicker';

type Props = {
    isSignedIn?: boolean;
    asyncCountryCode?: Promise<string>;
    CAPI: CAPIBrowserType;
};

const getBannerLastClosedAt = (key: string): string | undefined => {
    const item = localStorage.getItem(`gu.prefs.${key}`);
    return (item && JSON.parse(item).value) || undefined;
};

const DEFAULT_BANNER_TIMEOUT_MILLIS = 2000;

const buildNewCmpBannerConfig = (): Banner => {
    return {
        id: 'cmpUi',
        canShow: () => willShowCMP().then((result) => ({ result: !!result })),
        // New CMP is not a react component and is shown outside of react's world
        // so render nothing if it will show
        show: () => null,
        timeoutMillis: null,
    };
};

const buildOldCmpBannerConfig = (CAPI: CAPIBrowserType): Banner => {
    return {
        id: 'cmpUi',
        canShow: () =>
            shouldShowOldCMP().then((shouldShowOld) => ({
                result: shouldShowOld && CAPI.config.cmpUi,
            })),
        show: () => CMP,
        timeoutMillis: null,
    };
};

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
                switches: {
                    remoteSubscriptionsBanner: !!CAPI.config
                        .remoteSubscriptionsBanner,
                },
            }),
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        show: (meta: any) => () => <ReaderRevenueBanner {...meta} />,
        timeoutMillis: DEFAULT_BANNER_TIMEOUT_MILLIS,
    };
};

export const StickyBottomBanner = ({
    isSignedIn,
    asyncCountryCode,
    CAPI,
}: Props) => {
    const [SelectedBanner, setSelectedBanner] = useState<React.FC | null>(null);

    useEffect(() => {
        if (isSignedIn === undefined || asyncCountryCode === undefined) {
            return;
        }

        const newCmp = buildNewCmpBannerConfig();
        const oldCmp = buildOldCmpBannerConfig(CAPI);
        const readerRevenue = buildReaderRevenueBannerConfig(
            CAPI,
            isSignedIn,
            asyncCountryCode,
        );
        const bannerConfig: BannerConfig = [newCmp, oldCmp, readerRevenue];

        pickBanner(bannerConfig).then((PickedBanner: () => MaybeFC) =>
            setSelectedBanner(PickedBanner),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignedIn, asyncCountryCode]);

    if (SelectedBanner) {
        return <SelectedBanner />;
    }

    return null;
};
