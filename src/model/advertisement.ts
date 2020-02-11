export const namedAdSlotParameters = (name: AdSlotType): AdSlotParameters => {
    const mapping: { [key: string]: AdSlotParameters } = {
        // The current parameters have been taken from looking at an example of right MPU on an article.
        // regular article: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad js-sticky-mpu ad-slot--rendered
        // dotcom rendering: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad ad-slot--rendered js-sticky-mpu
        right: {
            name: 'right',
            adTypes: ['mpu-banner-ad', 'rendered'],
            sizeMapping: {
                mobile: ['1,1|2,2|300,250|300,274|300,600|fluid'],
                // Pascal: It's not totally obvious where this sequence should come from the frontend code,
                // but it should be correct.
            },
            showLabel: true,
            refresh: false,
            outOfPage: false,
            optId: undefined,
            optClassNames: ['js-sticky-mpu'],
        },
        'top-above-nav': {
            name: 'top-above-nav',
            adTypes: ['mpu-banner-ad', 'rendered'],
            sizeMapping: {
                tablet: ['1,1|2,2|88,71|300,197|300,250|fluid'],
            },
            showLabel: true,
            refresh: false,
            outOfPage: false,
            optId: undefined,
            optClassNames: [],
        },
        mostpop: {
            name: 'mostpop',
            adTypes: ['mpu-banner-ad', 'rendered'],
            sizeMapping: {
                mobile: ['1,1|2,2|300,197|300,250|300,274|fluid'],
                phablet: [
                    '1,1|2,2|300,197|300,250|300,274|620,350|550,310|fluid',
                ],
                desktop: [
                    '1,1|2,2|300,250|300,274|620,1|620,350|550,310|fluid',
                ],
            },
            showLabel: true,
            refresh: false,
            outOfPage: false,
            optId: undefined,
            optClassNames: ['js-sticky-mpu'],
        },
        'merchandising-high': {
            name: 'merchandising-high',
            adTypes: [],
            sizeMapping: {
                mobile: ['1,1|2,2|88,87|fluid'],
            },
            showLabel: false,
            refresh: false,
            outOfPage: false,
            optId: undefined,
            optClassNames: [],
        },
    };
    return mapping[name];
};
