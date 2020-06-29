import { getCountryCode } from '@frontend/web/lib/getCountryCode';

let applies: undefined | boolean;

export const ccpaApplies = async () => {
    if (typeof applies === 'undefined') {
        const isInUS = (await getCountryCode()) === 'US';
        applies = window.guardian?.config?.switches?.ccpaCmpUi && isInUS;
    }
    return applies;
};
