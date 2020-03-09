import React, { useState, useEffect } from 'react';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';

export const CMP = ({ cmpUi }: { cmpUi: boolean }) => {
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

    if (!show || !cmpUi) {
        return null;
    }

    const props = {
        source: 'dcr',
        onClose,
    };

    return <ConsentManagementPlatform {...props} />;
};
