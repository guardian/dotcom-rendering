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
    return (
        localStorage.getItem('gu.prefs.engagementBannerLastClosedAt') ||
        undefined
    );
};

export const StickyBottomBanner = ({
    isSignedIn,
    countryCode,
    CAPI,
}: Props) => {
    const [showOldCMP, setShowOldCMP] = useState<boolean | null>(null);
    const [newCMPWillShow, setNewCMPWillShow] = useState<boolean | null>(null);

    useEffect(() => {
        Promise.all([shouldShowOldCMP(), willShowNewCMP()]).then(
            ([shouldShowOld, willShowNew]) => {
                setShowOldCMP(shouldShowOld && CAPI.config.cmpUi);
                setNewCMPWillShow(willShowNew);
            },
        );
    }, [CAPI.config.cmpUi]);

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

    return null;
};
