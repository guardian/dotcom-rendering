import { cmp } from '@guardian/consent-management-platform';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { addPrivacySettingsLink } from './CMPPrivacyLink';

// this is the wrong place to be doing this, but it's temporary
// until we remove the old react CMP component and go 100% sourcepoint
export const willShowCMP = async () => {
    const isInUsa = (await getCountryCode()) === 'US';

    cmp.init({
        isInUsa,
    });
    addPrivacySettingsLink();
    return cmp.willShowPrivacyMessage();
};
