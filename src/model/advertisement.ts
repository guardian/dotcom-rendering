/*
    This file's values are meant to mirror the values used by frontend.
    Look for marks:
        432b3a46-90c1-4573-90d3-2400b51af8d0
        1b109a4a-791c-4214-acd2-2720d7d9f96f
    ... in the frontend code
 */

const adSizeNameToValues = (name: string): string => {
    // These values mirror frontend file with mark: 1b109a4a-791c-4214-acd2-2720d7d9f96f
    switch (name) {
        // standard ad sizes
        case 'billboard':
            return '970, 250';
        case 'leaderboard':
            return '728, 90';
        case 'mpu':
            return '300, 250';
        case 'halfPage':
            return '300, 600';
        case 'portrait':
            return '300, 1050';
        case 'skyscraper':
            return '160, 600';
        case 'mobilesticky':
            return '320, 50';

        // dfp proprietary ad sizes
        case 'fluid':
            return 'fluid';
        case 'outOfPage':
            return '1, 1';
        case 'googleCard':
            return '300, 274';

        // guardian proprietary ad sizes
        case 'video':
            return '620, 1';
        case 'outstreamDesktop':
            return '620, 350';
        case 'outstreamGoogleDesktop':
            return '550, 310';
        case 'outstreamMobile':
            return '300, 197';
        case 'merchandisingHighAdFeature':
            return '88, 89';
        case 'merchandisingHigh':
            return '88, 87';
        case 'merchandising':
            return '88, 88';
        case 'inlineMerchandising':
            return '88, 85';
        case 'fabric':
            return '88, 71';
        case 'empty':
            return '2, 2';

        // default
        default:
            return '1, 1';
    }
};

const adSizeNamesToString = (names: string[]): string => {
    return names
        .map((name) => {
            return adSizeNameToValues(name);
        })
        .join('|');
};

export const namedAdSlotParameters = (name: AdSlotType): AdSlotParameters => {
    // The current parameters have been taken from looking at an example of right MPU on an article.
    // regular article: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad js-sticky-mpu ad-slot--rendered
    // dotcom rendering: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad ad-slot--rendered js-sticky-mpu
    switch (name) {
        case 'right': {
            return {
                name: 'right',
                adTypes: ['mpu-banner-ad', 'rendered'],
                sizeMapping: {
                    mobile: ['1,1|2,2|300,250|300,274|300,600|fluid'],
                    // mark: 01303e88-ef1f-462d-9b6e-242419435cec
                },
                showLabel: true,
                refresh: false,
                outOfPage: false,
                optId: undefined,
                optClassNames: ['js-sticky-mpu'],
            };
        }
        case 'comments': {
            return {
                name: 'comments',
                adTypes: ['mpu-banner-ad', 'rendered'],
                sizeMapping: {
                    mobile: ['1,1|2,2|300,600|fluid'],
                    desktop: [
                        '1,1|2,2|620,1|620,350|550,310|fluid|300,600|160,600',
                    ],
                    phablet: ['1,1|2,2|620,350|550,310|fluid'],
                },
                showLabel: true,
                refresh: false,
                outOfPage: false,
                optId: undefined,
                optClassNames: ['js-sticky-mpu'],
            };
        }
        case 'top-above-nav': {
            return {
                name: 'top-above-nav',
                adTypes: ['mpu-banner-ad', 'rendered'],
                sizeMapping: {
                    // The sizes here come from two places in the frontend code
                    // 1. file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
                    // 2. file mark: c66fae4e-1d29-467a-a081-caad7a90cacd
                    tablet: [
                        [
                            adSizeNamesToString([
                                'outOfPage',
                                'empty',
                                'fabric',
                                'fluid',
                                'leaderboard',
                            ]),
                        ].join('|'),
                    ],
                    desktop: [
                        '1,1|2,2|728,90|940,230|900,250|970,250|88,71|fluid',
                    ], // Values from file mark: c66fae4e-1d29-467a-a081-caad7a90cacd
                },
                showLabel: true,
                refresh: false,
                outOfPage: false,
                optId: undefined,
                optClassNames: [],
            };
        }
        case 'mostpop': {
            return {
                name: 'mostpop',
                adTypes: ['mpu-banner-ad', 'rendered'],
                sizeMapping: {
                    // mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
                    mobile: [
                        adSizeNamesToString([
                            'outOfPage',
                            'empty',
                            'mpu',
                            'googleCard',
                            'fluid',
                        ]),
                    ],
                    tablet: [
                        [
                            adSizeNamesToString([
                                'outOfPage',
                                'empty',
                                'mpu',
                                'googleCard',
                                'halfPage',
                                'leaderboard',
                                'fluid',
                            ]),
                        ].join('|'),
                    ],
                    phablet: [
                        adSizeNamesToString([
                            'outOfPage',
                            'empty',
                            'outstreamMobile',
                            'mpu',
                            'googleCard',
                            'outstreamDesktop',
                            'outstreamGoogleDesktop',
                            'fluid',
                        ]),
                    ],
                    desktop: [
                        adSizeNamesToString([
                            'outOfPage',
                            'empty',
                            'mpu',
                            'googleCard',
                            'halfPage',
                            'fluid',
                        ]),
                    ],
                },
                showLabel: true,
                refresh: false,
                outOfPage: false,
                optId: undefined,
                optClassNames: ['js-sticky-mpu'],
            };
        }
        case 'merchandising-high': {
            return {
                name: 'merchandising-high',
                adTypes: [],
                sizeMapping: {
                    // mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
                    mobile: [
                        adSizeNamesToString([
                            'outOfPage',
                            'empty',
                            'merchandisingHigh',
                            'fluid',
                        ]),
                    ],
                },
                showLabel: false,
                refresh: false,
                outOfPage: false,
                optId: undefined,
                optClassNames: [],
            };
        }
        case 'merchandising': {
            return {
                name: 'merchandising',
                adTypes: [],
                sizeMapping: {
                    // mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
                    mobile: [
                        adSizeNamesToString([
                            'outOfPage',
                            'empty',
                            'merchandising',
                            'fluid',
                        ]),
                    ],
                },
                showLabel: false,
                refresh: false,
                outOfPage: false,
                optId: undefined,
                optClassNames: [],
            };
        }
    }
};
