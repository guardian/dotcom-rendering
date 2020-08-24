import { cmp } from '@guardian/consent-management-platform';
import { startup } from '@root/src/web/browser/startup';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getCookie } from '@frontend/web/browser/cookie';
import { addPrivacySettingsLink } from '../../lib/addPrivacySettingsLink';

const initConsent = async () => {
    const isInUsa = (await getCountryCode()) === 'US';
    const browserId: string | undefined = getCookie('bwid') || undefined;
    const pubData: { browserId?: string } | undefined = browserId
        ? { browserId }
        : undefined;
    addPrivacySettingsLink();
    cmp.init({ isInUsa, pubData });
};

const switches =
    'guardian' in window &&
    'config' in window.guardian &&
    'switches' in window.guardian.config
        ? window.guardian.config.switches
        : {};

const init = async () => {
    if (switches.consentManagement) {
        initConsent();
    }
};

startup('commercial', null, init);
