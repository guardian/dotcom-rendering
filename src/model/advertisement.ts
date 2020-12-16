/*
    This file's values are meant to mirror the values used by frontend.
    Look for marks:
        432b3a46-90c1-4573-90d3-2400b51af8d0
        1b109a4a-791c-4214-acd2-2720d7d9f96f
    ... in the frontend code
 */

enum Size {
    // standard ad sizes
    billboard = '970,250',
    leaderboard = '728,90',
    mpu = '300,250',
    halfPage = '300,600',
    portrait = '300,1050',
    skyscraper = '160,600',
    mobilesticky = '320,50',
    // dfp proprietary ad sizes
    fluid = 'fluid',
    outOfPage = '1,1',
    googleCard = '300,274',
    // guardian proprietary ad sizes
    video = '620,1',
    outstreamDesktop = '620,350',
    outstreamGoogleDesktop = '550,310',
    outstreamMobile = '300,197',
    merchandisingHighAdFeature = '88,89',
    merchandisingHigh = '88,87',
    merchandising = '88,88',
    inlineMerchandising = '88,85',
    fabric = '88,71',
    empty = '2,2',
}

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
                    mobile: [
                        `${Size.outOfPage}|${Size.empty}|${Size.mpu}|${Size.googleCard}|${Size.halfPage}|fluid`,
                    ],
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
                    mobile: [
                        `${Size.outOfPage}|${Size.empty}|${Size.halfPage}|fluid`,
                    ],
                    desktop: [
                        `${Size.outOfPage}|${Size.empty}|${Size.video}|${Size.outstreamDesktop}|${Size.outstreamGoogleDesktop}|fluid|${Size.halfPage}|${Size.skyscraper}`,
                    ],
                    phablet: [
                        `${Size.outOfPage}|${Size.empty}|${Size.outstreamDesktop}|${Size.outstreamGoogleDesktop}|fluid`,
                    ],
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
                        `${Size.outOfPage}|${Size.empty}|${Size.fabric}|fluid|${Size.leaderboard}`,
                    ],
                    desktop: [
                        `${Size.outOfPage}|${Size.empty}|${Size.leaderboard}|940,230|900,250|${Size.billboard}|${Size.fabric}|fluid`,
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
                        `${Size.outOfPage}|${Size.empty}|${Size.mpu}|${Size.googleCard}|fluid`,
                    ],
                    tablet: [
                        `${Size.outOfPage}|${Size.empty}|${Size.mpu}|${Size.googleCard}|${Size.halfPage}|${Size.leaderboard}|fluid`,
                    ],
                    phablet: [
                        `${Size.outOfPage}|${Size.empty}|${Size.outstreamMobile}|${Size.mpu}|${Size.googleCard}|${Size.halfPage}|${Size.outstreamGoogleDesktop}|fluid`,
                    ],
                    desktop: [
                        `${Size.outOfPage}|${Size.empty}|${Size.mpu}|${Size.googleCard}|${Size.halfPage}|fluid`,
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
                        `${Size.outOfPage}|${Size.empty}|${Size.merchandisingHigh}|fluid`,
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
                        `${Size.outOfPage}|${Size.empty}|${Size.merchandising}|fluid`,
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
