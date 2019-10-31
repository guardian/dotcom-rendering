// tslint:disable:react-no-dangerous-html

import { makeInternalSizeMappings, makeClassNames } from './AdSlot';

describe('AdSlot', () => {
    it('It should compute the internal size mappings correctly', () => {
        const inputSizeMappings = {
            mobile: ['1,1|2,2|300,250|300,274|300,600|fluid|300,1050'],
        };
        expect(
            makeInternalSizeMappings(inputSizeMappings).mobile ===
                '1,1|2,2|300,250|300,274|300,600|fluid|300,1050',
        );
    });
    it('It should compute class names correctly', () => {
        const name = 'right';
        const adTypes = ['mpu-banner-ad', 'rendered'];
        const optClassNames = ['js-sticky-mpu'];
        expect(
            makeClassNames(name, adTypes, optClassNames) ===
                'js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad ad-slot--rendered js-sticky-mpu ad-slot--gc',
        );
    });
});
