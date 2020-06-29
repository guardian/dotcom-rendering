import React, { useState, useEffect, Suspense } from 'react';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/dist/ConsentManagementPlatform';
import {
    init as initCCPA,
    shouldShow,
    setErrorHandler,
    checkWillShowUi as checkWillShowCCPAUi,
} from '@guardian/consent-management-platform';
import { ccpaApplies } from '@root/src/web/lib/ccpaApplies';

// this is the wrong place to be doing this, but it's temporary
// until we remove the old react CMP component and go 100% sourcepoint
export const willShowNewCMP = async () => {
    const useCCPA = await ccpaApplies();

    if (useCCPA) {
        initCCPA({
            useCcpa: true,
        });
        return checkWillShowCCPAUi();
    }

    return false;
};

export const shouldShowOldCMP = async () =>
    (await ccpaApplies()) ? false : shouldShow();

export const CMP = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);

        // setErrorHandler takes function to be called on errors in the CMP UI
        setErrorHandler((errMsg: string): void => {
            const err = new Error(errMsg);

            window.guardian.modules.sentry.reportError(err, 'cmp');
        });
    }, []);

    return (
        <>
            {show && (
                <Suspense fallback={<></>}>
                    <ConsentManagementPlatform
                        source="dcr"
                        onClose={() => setShow(false)}
                    />
                </Suspense>
            )}
        </>
    );
};
