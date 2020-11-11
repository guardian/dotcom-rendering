import { ABTest } from '@guardian/ab-core';

export const newsletterMerchUnitLighthouse: ABTest = {
    id: 'NewsletterMerchUnitLighthouse',
    start: '2020-11-11',
    expiry: '2020-12-01',
    author: 'Josh Buckland & Alex Dufournet',
    description: 'Show a newsletter advert in the merchandising unit to 50% of users',
    audience: 1.0, // 0.01%
    audienceOffset: 0.0,
    successMeasure: 'We see increased engagement from users shown the Newsletters ad unit',
    audienceCriteria: 'Website users only.',
    idealOutcome: 'Investigate lighthouse segment engagement via newsletters',
    showForSensitive: false,
    canRun: () => true,
    variants: [
        {
            id: 'control',
            test: (): void => {},
            impression: (impression) => {
                impression();
            },
            success: (success) => {
                success();
            },
        },
        {
            id: 'variant',
            test: (): void => {},
            impression: (impression) => {
                impression();
            },
            success: (success) => {
                success();
            },
        },
    ],
};
