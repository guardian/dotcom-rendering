import { ccpaApplies } from '@root/src/web/lib/ccpaApplies';

let applies: undefined | boolean;

export const shouldUseSourcepointCmp = async () => {
    if (typeof applies === 'undefined') {
        const useTcfv2 =
            'guardian' in window &&
            'config' in window.guardian &&
            'switches' in window.guardian.config &&
            'useTcfv2' in window.guardian.config.switches &&
            window.guardian.config.switches.useTcfv2;
        applies = (await ccpaApplies()) || useTcfv2;
    }
    return applies;
};
