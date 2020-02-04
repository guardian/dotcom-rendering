import { CAPI } from '@root/fixtures/CAPI/CAPI';
import { buildAdTargeting } from './ad-targeting';

describe('buildAdTargeting', () => {
    const expectedAdTargeting = {
        adUnit: '/59666047/theguardian.com/film/article/ng',
        customParams: {
            cc: '',
            inskin: 'f',
            pa: 'f',
            s: '',
            sens: 'f',
            si: 'f',
            vl: 0,
        },
    };
    it('builds adTargeting correctly', () => {
        expect(buildAdTargeting(CAPI.config)).toEqual(expectedAdTargeting);
    });
});
