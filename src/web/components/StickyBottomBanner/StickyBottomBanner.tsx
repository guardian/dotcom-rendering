import React, { useState, useEffect } from 'react';
import {
    CMP,
    willShowNewCMP,
    shouldShowOldCMP,
} from '@root/src/web/components/StickyBottomBanner/CMP';
import { ReaderRevenueBanner } from '@root/src/web/components/StickyBottomBanner/ReaderRevenueBanner';
import { getAlreadyVisitedCount } from '@root/src/web/lib/alreadyVisited';

type Props = {
    isSignedIn?: boolean;
    countryCode?: string;
    CAPI: CAPIBrowserType;
};

const getEngagementBannerLastClosedAt = (): string | undefined => {
    const item = localStorage.getItem('gu.prefs.engagementBannerLastClosedAt');
    return (item && JSON.parse(item).value) || undefined;
};

export const StickyBottomBanner = ({
    isSignedIn,
    countryCode,
    CAPI,
}: Props) => {
    const [showOldCMP, setShowOldCMP] = useState<boolean | null>(null);
    const [newCMPWillShow, setNewCMPWillShow] = useState<boolean | null>(null);

    useEffect(() => {
        shouldShowOldCMP().then((shouldShowOld) =>
            setShowOldCMP(shouldShowOld && CAPI.config.cmpUi),
        );
        willShowNewCMP().then(setNewCMPWillShow);
    }, [CAPI.config.cmpUi]);

    // Don't render anything until we know whether we can show the CMP
    if (showOldCMP === null || newCMPWillShow === null) {
        return null;
    }

    // New CMP is not a react component and is shown outside of react's world
    // so render nothing if it will show
    if (newCMPWillShow) return null;

    if (showOldCMP) return <CMP />;

    const showRRBanner = CAPI.config.remoteBanner && countryCode === 'AU';

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
                engagementBannerLastClosedAt={getEngagementBannerLastClosedAt()}
            />
        );

    // Nothing applies, so do nothing.
    return null;
};
