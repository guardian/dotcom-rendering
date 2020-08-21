import React, { useState, useEffect } from 'react';
import { ReaderRevenueBanner } from '@root/src/web/components/StickyBottomBanner/ReaderRevenueBanner';
import { getAlreadyVisitedCount } from '@root/src/web/lib/alreadyVisited';
import { cmp } from '@guardian/consent-management-platform';

type Props = {
    isSignedIn?: boolean;
    countryCode?: string;
    CAPI: CAPIBrowserType;
};

const getBannerLastClosedAt = (key: string): string | undefined => {
    const item = localStorage.getItem(`gu.prefs.${key}`);
    return (item && JSON.parse(item).value) || undefined;
};

export const StickyBottomBanner = ({
    isSignedIn,
    countryCode,
    CAPI,
}: Props) => {
    const [CMPWillShow, setCMPWillShow] = useState<boolean>(true);

    useEffect(() => {
        cmp.willShowPrivacyMessage().then(setCMPWillShow);
    }, []);

    // CMP is not a react component and is shown outside of react's world
    // so render nothing if it will show
    if (CMPWillShow) return null;

    const showRRBanner = CAPI.config.remoteBanner;

    if (showRRBanner)
        return (
            <ReaderRevenueBanner
                isSignedIn={isSignedIn}
                countryCode={countryCode}
                contentType={CAPI.contentType}
                sectionName={CAPI.sectionName}
                shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
                isMinuteArticle={CAPI.pageType.isMinuteArticle}
                isPaidContent={CAPI.pageType.isPaidContent}
                isSensitive={CAPI.config.isSensitive}
                tags={CAPI.tags}
                contributionsServiceUrl={CAPI.contributionsServiceUrl}
                alreadyVisitedCount={getAlreadyVisitedCount()}
                engagementBannerLastClosedAt={getBannerLastClosedAt(
                    'engagementBannerLastClosedAt',
                )}
                subscriptionBannerLastClosedAt={getBannerLastClosedAt(
                    'subscriptionBannerLastClosedAt',
                )}
                switches={{
                    remoteSubscriptionsBanner: !!CAPI.config
                        .remoteSubscriptionsBanner,
                }}
            />
        );

    // Nothing applies, so do nothing.
    return null;
};
