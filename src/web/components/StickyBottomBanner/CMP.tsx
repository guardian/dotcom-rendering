import React, { useState, useEffect, Suspense } from 'react';
import { cmp, oldCmp } from '@guardian/consent-management-platform';
import { getCountryCode } from '@root/src/web/lib/getCountryCode';
import { getPrivacyFramework } from '@root/src/web/lib/getPrivacyFramework';
import { addPrivacySettingsLink } from './CMPPrivacyLink';

export const willShowCMP = async () => {
    const framework = await getPrivacyFramework();

    if (!framework.ccpa && !framework.tcfv2) return false;

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
    (await getPrivacyFramework()).tcfv1 ? oldCmp.shouldShow() : false;

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

    return (
        <>
            {show && (
                <Suspense fallback={<></>}>
                    <oldCmp.ConsentManagementPlatform
                        source="dcr"
                        onClose={() => setShow(false)}
                    />
                </Suspense>
            )}
        </>
    );
};
