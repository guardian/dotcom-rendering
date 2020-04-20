import React, { useState, useEffect } from 'react';
import {
    shouldShow,
    setErrorHandler,
} from '@guardian/consent-management-platform';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';

let variant: string | undefined;

if (
    window &&
    window.guardian &&
    window.guardian.config &&
    window.guardian.config.switches &&
    window.guardian.config.switches.abCommercialCmpCopy
) {
    const participations = localStorage.getItem('gu.ab.participations');

    if (participations) {
        try {
            variant = `commercialCmpCopy-${JSON.parse(
                participations,
            ).value.commercialCmpCopy.variant.toLocaleLowerCase()}`;
        } catch (e) {
            // do nothing
        }
    }
}

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
                    variant={variant}
                />
            )}
        </>
    );
};
