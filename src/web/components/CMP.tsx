import React, { useState, useEffect } from 'react';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';

type Props = {
    cmpUi: boolean; // A switch to decide if we show CMP or not
};

const CMP = ({ cmpUi }: Props) => {
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

    return <ConsentManagementPlatform source="dcr" onClose={onClose} />;
};

export default CMP;
