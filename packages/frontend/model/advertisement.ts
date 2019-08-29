import { AdSlotParameters } from '@frontend/web/components/AdSlot';

// We are using this function to control the activation of the commercial features
// Currently it reports that the user has opted in to a 0% AB test.
export const shouldDisplayAdvertisements = (config: ConfigType) => {
    return config.abTests.dotcomRenderingAdvertisementsVariant === 'variant';
};

export const adSlotParameters = () => {
    // The current parameters have been taken from looking at an example of right MPU on an article.
    // regular article: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad js-sticky-mpu ad-slot--rendered
    // dotcom rendering: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad ad-slot--rendered js-sticky-mpu
    return {
        name: 'right',
        adTypes: ['mpu-banner-ad', 'rendered'],
        sizeMapping: {
            mobile: ['1,1|2,2|300,250|300,274|300,600|fluid|300,1050'],
        },
        showLabel: true,
        refresh: false,
        outOfPage: false,
        optId: undefined,
        optClassNames: ['js-sticky-mpu'],
    } as AdSlotParameters;
};
