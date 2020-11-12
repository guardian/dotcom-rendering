import { ABTest } from '@guardian/ab-core';

export const newsletterMerchUnitLighthouseControl: ABTest = {
    id: 'NewsletterMerchUnitLighthouseControl',
    start: '2020-11-11',
    expiry: '2020-12-01',
    author: 'Josh Buckland & Alex Dufournet',
    description: 'Show a newsletter advert in the merchandising unit to 50% of users',
    audience: 0.5,
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
        },
    ],
};

export const newsletterMerchUnitLighthouseVariants: ABTest = {
    id: 'NewsletterMerchUnitLighthouseVariants',
    start: '2020-11-11',
    expiry: '2020-12-01',
    author: 'Josh Buckland & Alex Dufournet',
    description: 'Show a newsletter advert in the merchandising unit to 50% of users',
    audience: 0.5,
    audienceOffset: 0.5,
    successMeasure: 'We see increased engagement from users shown the Newsletters ad unit',
    audienceCriteria: 'Website users only.',
    idealOutcome: 'Investigate lighthouse segment engagement via newsletters',
    showForSensitive: false,
    canRun: () => true,
    variants: [
        {
            id: 'variant1',
            test: (): void => {},
        },
        {
            id: 'variant2',
            test: (): void => {},
        },
    ],
};
