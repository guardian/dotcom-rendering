import { makeClassNames } from './AdSlot';

describe('AdSlot', () => {
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
