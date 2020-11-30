import { ABTest } from '@guardian/ab-core';

export const curatedContainerTest2: ABTest = {
    id: 'CuratedContainerTest2',
    start: '2020-11-23',
    expiry: '2020-12-10',
    author: 'rcrphillips',
    description:
        'Tests an additional "curated" onwards container below the article body and extends it to utilise different containers based on the pillar of the article',
    audience: 0.5,
    audienceOffset: 0,
    successMeasure: 'CTR on article pages',
    audienceCriteria: 'Everyone',
    idealOutcome:
        'A significant increase in CTR compared to when the additional container is not present',
    showForSensitive: true,
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
            id: 'fixed',
            test: (): void => {},
            impression: (impression) => {
                impression();
            },
            success: (success) => {
                success();
            },
        },
        {
            id: 'carousel',
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
