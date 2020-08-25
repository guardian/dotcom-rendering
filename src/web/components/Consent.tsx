import { cmp } from '@guardian/consent-management-platform';

import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getCookie } from '@frontend/web/browser/cookie';
import { addPrivacySettingsLink } from '@frontend/web/lib/addPrivacySettingsLink';
import { useEffect } from 'react';

export const Consent = ({ CAPI }: { CAPI: CAPIBrowserType }) => {
    useEffect(() => {
        if (CAPI.config.switches.consentManagement) {
            getCountryCode().then((countryCode) => {
                const browserId: string | undefined =
                    getCookie('bwid') || undefined;
                const pubData: { browserId?: string } | undefined = browserId
                    ? { browserId }
                    : undefined;
                addPrivacySettingsLink();
                cmp.init({ isInUsa: countryCode === 'US', pubData });
            });
        }
    }, [CAPI]);

    return null;
};
