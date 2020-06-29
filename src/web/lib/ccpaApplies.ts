import { getCountryCode } from '@frontend/web/lib/getCountryCode';

let applies: undefined | boolean;

export const ccpaApplies = async () => {
    if (typeof applies === 'undefined') {
        const isInUS = (await getCountryCode()) === 'US';
        applies =
            'guardian' in window &&
            'config' in window.guardian &&
            'switches' in window.guardian.config &&
            'ccpaCmpUi' in window.guardian.config.switches &&
            window.guardian.config.switches.ccpaCmpUi &&
            isInUS;
    }
    return applies;
};
