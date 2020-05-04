import React, { useState, useEffect, Suspense } from 'react';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';

import { initPerf } from '@root/src/web/browser/startup';

const ConsentManagementPlatform = React.lazy(() => {
    const { start, end } = initPerf('ConsentManagementPlatform');
    start();
    return import(
        /* webpackChunkName: "ConsentManagementPlatform" */ '@guardian/consent-management-platform/lib/ConsentManagementPlatform'
    ).then(module => {
        end();
        return { default: module.ConsentManagementPlatform };
    });
});

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
            {true && (
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
