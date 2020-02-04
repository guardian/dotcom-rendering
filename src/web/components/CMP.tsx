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

    const onClose = () => setShow(false);

    const { cmpUi } = window.guardian.app.data.CAPI.config.switches;

    if (!show || !cmpUi) {
        return null;
    }

    const props = {
        source: 'www',
        onClose,
    };

    return <ConsentManagementPlatform {...props} />;
};
