import React, { useState, useEffect } from 'react';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';

export const CMP = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (shouldShow()) {
            setShow(true);

            // setErrorHandler takes function to be called on errors in the CMP UI
            setErrorHandler((errMsg: string): void => {
                const err = new Error(errMsg);

                window.guardian.modules.sentry.reportError(err, 'cmp');
            });
        }
    }, []);

    return (
        <>
            {show && (
                <ConsentManagementPlatform
                    source="dcr"
                    onClose={() => setShow(false)}
                />
            )}
        </>
    );
};
