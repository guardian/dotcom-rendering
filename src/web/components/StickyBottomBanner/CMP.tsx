import React, { useState, useEffect, Suspense } from 'react';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/dist/ConsentManagementPlatform';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';
import { ccpaApplies } from '../../lib/ccpaApplies';

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
