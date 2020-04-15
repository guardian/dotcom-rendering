import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component';

const ConsentManagementComponent = loadable.lib(() =>
    import(
        '@guardian/consent-management-platform/lib/ConsentManagementPlatform'
    ),
);

const CMP = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        import(
            /* webpackChunkName: "consent-management-platform" */ '@guardian/consent-management-platform'
        ).then(({ shouldShow, setErrorHandler }) => {
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

    const onClose = () => setShow(false);

    if (!show) {
        return null;
    }

    return (
        <ConsentManagementComponent>
            {({ ConsentManagementPlatform }) => (
                <ConsentManagementPlatform source="dcr" onClose={onClose} />
            )}
        </ConsentManagementComponent>
    );
};

export default CMP;
