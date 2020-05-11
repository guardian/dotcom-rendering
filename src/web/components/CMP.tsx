import React, { useState, useEffect } from 'react';

import { ConsentManagementPlatform } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';
import { initPerf } from '@root/src/web/browser/initPerf';

export const CMP = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const { start, end } = initPerf(
            'consent-management-platform-utilities',
        );
        start();
        import(
            /* webpackChunkName: "consent-management-platform-utilities" */ '@guardian/consent-management-platform'
        ).then(({ shouldShow, setErrorHandler }) => {
            end();
            if (shouldShow()) {
                setShow(true);

                // setErrorHandler takes function to be called on errors in the CMP UI
                setErrorHandler((errMsg: string): void => {
                    const err = new Error(errMsg);

                    window.guardian.modules.sentry.reportError(err, 'cmp');
                });
            }
        });
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
