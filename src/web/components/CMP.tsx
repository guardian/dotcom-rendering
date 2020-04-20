import React, { useState, useEffect, Suspense } from 'react';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';

const ConsentManagementPlatform = React.lazy(() =>
    import(
        /* webpackChunkName: "ConsentManagementPlatform" */ '@guardian/consent-management-platform/lib/ConsentManagementPlatform'
    ).then(module => ({ default: module.ConsentManagementPlatform })),
);

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
