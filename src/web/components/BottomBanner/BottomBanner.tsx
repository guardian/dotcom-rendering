import React, { useState, useEffect } from 'react';
import {
    CMP,
    canShow as shouldShowCMP,
} from '@root/src/web/components/BottomBanner/CMP';
import { ReaderRevenueBanner } from '@root/src/web/components/BottomBanner/ReaderRevenueBanner';

type Props = {
    isSignedIn?: boolean;
    countryCode?: string;
    CAPI: CAPIBrowserType;
};

export const BottomBanner = ({ isSignedIn, countryCode, CAPI }: Props) => {
    const [showCMP, setShowCMP] = useState<boolean | null>(null);

    useEffect(() => {
        const callShouldShow = async () => setShowCMP(await shouldShowCMP());

        if (CAPI.config.cmpUi) {
            callShouldShow();
        }
    }, [CAPI.config.cmpUi]);

    // Don't render anything until we know whether we can show the CMP
    if (showCMP === null) {
        return null;
    }

    return (
        <>
            {!showCMP ? (
                <CMP />
            ) : (
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
                />
            )}
        </>
    );
};
