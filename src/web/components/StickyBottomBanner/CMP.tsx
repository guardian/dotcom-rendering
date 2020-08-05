import React, { useState, useEffect, Suspense } from 'react';
import { cmp, oldCmp } from '@guardian/consent-management-platform';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { shouldUseSourcepointCmp } from '@root/src/web/lib/sourcepoint';
import { addPrivacySettingsLink } from './CMPPrivacyLink';

export const willShowCMP = async () => {
    if (!(await shouldUseSourcepointCmp())) return false;

    const isInUsa = (await getCountryCode()) === 'US';

    cmp.init({
        isInUsa,
    });
    addPrivacySettingsLink();
    return cmp.willShowPrivacyMessage();
};

// this is the wrong place to be doing this, but it's temporary
// until we remove the old react CMP component and go 100% sourcepoint
export const shouldShowOldCMP = async () =>
    (await shouldUseSourcepointCmp()) ? false : oldCmp.shouldShow();

export const CMP = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);

        // setErrorHandler takes function to be called on errors in the CMP UI
        oldCmp.setErrorHandler((errMsg: string): void => {
            const err = new Error(errMsg);

            window.guardian.modules.sentry.reportError(err, 'cmp');
        });
    }, []);

    const { ConsentManagementPlatform } = oldCmp;

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
