/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { css } from 'emotion';

import { border, neutral, text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

type Props = {
    position: AdSlotType;
    localStyles?: string;
    heightToStick?: string;
};

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

export const labelStyles = css`
    .ad-slot__label,
    .ad-slot__scroll {
        ${textSans.xsmall()};
        position: relative;
        height: 24px;
        background-color: ${neutral[97]};
        padding: 0 8px;
        border-top: 1px solid ${border.secondary};
        color: ${text.supporting};
        text-align: left;
        box-sizing: border-box;
    }

    .ad-slot__close-button {
        display: none;
    }

    .ad-slot__scroll {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
`;

const mobileStickyAdStyles = css`
    position: fixed;
    bottom: 0;
    width: 320px;
    margin: 0 auto;
    right: 0;
    left: 0;
    z-index: 1010;
    ${from.phablet} {
        display: none;
    }
    .ad-slot__close-button {
        display: none;
        position: absolute;
        right: 3px;
        top: 3px;
        padding: 0;
        border: 0;
        height: 21px;
        width: 21px;
        background-color: transparent;
    }
    .ad-slot__close-button svg {
        height: 0.75rem;
        width: 0.75rem;
        stroke: ${neutral[7]};
        fill: ${neutral[7]};
        stroke-linecap: round;
        stroke-width: 0;
        text-align: center;
    }
    .ad-slot--mobile-sticky .ad-slot__label .ad-slot__close-button {
        display: block;
    }
    .ad-slot__close-button__x {
        stroke: ${neutral[7]};
        fill: transparent;
        stroke-linecap: round;
        stroke-width: 2;
        text-align: center;
    }
    .ad-slot__label {
        font-size: 0.75rem;
        line-height: 1.25rem;
        position: relative;
        height: 1.5rem;
        background-color: ${neutral[97]};
        padding: 0 0.5rem;
        border-top: 0.0625rem solid ${border.secondary};
        color: ${neutral[60]};
        text-align: left;
        box-sizing: border-box;
        ${textSans.xsmall()};
    }
`;

interface AdSlotInputSizeMappings {
    [key: string]: string[];
}

interface AdSlotInternalSizeMappings {
    [key: string]: string;
}

export const makeInternalSizeMappings = (
    inputSizeMapping: AdSlotInputSizeMappings,
): AdSlotInternalSizeMappings => {
    return Object.keys(inputSizeMapping).reduce(
        (m: { [key: string]: string }, key) => {
            m[`data-${key}`] = inputSizeMapping[key].join('|');
            return m;
        },
        {},
    );
};

export const makeClassNames = (
    name: AdSlotType,
    adTypes: string[],
    optClassNames: string[],
): string => {
    const baseClassNames = ['js-ad-slot', 'ad-slot', `ad-slot--${name}`];
    const adTypeClassNames = adTypes.map((adType) => `ad-slot--${adType}`);
    return baseClassNames.concat(adTypeClassNames, optClassNames).join(' ');
};

const AdSlotCore: React.FC<{
    name: AdSlotType;
    adTypes: string[];
    sizeMapping: AdSlotInputSizeMappings;
    optId?: string;
    optClassNames?: string[];
    localStyles?: string;
    positionStyles: string;
}> = ({
    name,
    adTypes,
    sizeMapping,
    optId,
    optClassNames,
    localStyles,
    positionStyles,
}) => {
    const sizeMappings = makeInternalSizeMappings(sizeMapping);
    return (
        <div
            id={`dfp-ad--${optId || name}`}
            className={`${makeClassNames(
                name,
                adTypes,
                optClassNames || [],
            )} ${positionStyles} ${localStyles} ${labelStyles}`}
            data-link-name={`ad slot ${name}`}
            data-name={name}
            // {...getOptionalProps()}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...sizeMappings}
            aria-hidden="true"
        />
    );
};

export const AdSlot: React.FC<Props> = ({
    position,
    localStyles,
    heightToStick,
}) => {
    switch (position) {
        case 'right': {
            return (
                <div
                    className={css`
                        position: static;
                        height: ${heightToStick || '100%'};
                    `}
                >
                    <AdSlotCore
                        name="right"
                        adTypes={['mpu-banner-ad', 'rendered']}
                        sizeMapping={{
                            mobile: [
                                `${Size.outOfPage}|${Size.empty}|${Size.mpu}|${Size.googleCard}|${Size.halfPage}|fluid`,
                            ],
                            // mark: 01303e88-ef1f-462d-9b6e-242419435cec
                        }}
                        optId={undefined}
                        optClassNames={['js-sticky-mpu']}
                        positionStyles={css`
                            position: sticky;
                            top: 0;
                        `}
                    />
                </div>
            );
        }
        case 'comments': {
            return (
                <div
                    className={css`
                        position: static;
                        height: ${heightToStick || '100%'};
                    `}
                >
                    <AdSlotCore
                        name="comments"
                        adTypes={['mpu-banner-ad', 'rendered']}
                        sizeMapping={{
                            mobile: [
                                `${Size.outOfPage}|${Size.empty}|${Size.halfPage}|fluid`,
                            ],
                            desktop: [
                                `${Size.outOfPage}|${Size.empty}|${Size.video}|${Size.outstreamDesktop}|${Size.outstreamGoogleDesktop}|fluid|${Size.halfPage}|${Size.skyscraper}`,
                            ],
                            phablet: [
                                `${Size.outOfPage}|${Size.empty}|${Size.outstreamDesktop}|${Size.outstreamGoogleDesktop}|fluid`,
                            ],
                        }}
                        optId={undefined}
                        optClassNames={['js-sticky-mpu']}
                        positionStyles={css`
                            position: sticky;
                            top: 0;
                        `}
                    />
                </div>
            );
        }
        case 'top-above-nav': {
            return (
                <AdSlotCore
                    name="top-above-nav"
                    adTypes={['mpu-banner-ad', 'rendered']}
                    sizeMapping={{
                        // The sizes here come from two places in the frontend code
                        // 1. file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
                        // 2. file mark: c66fae4e-1d29-467a-a081-caad7a90cacd
                        tablet: [
                            `${Size.outOfPage}|${Size.empty}|${Size.fabric}|fluid|${Size.leaderboard}`,
                        ],
                        desktop: [
                            `${Size.outOfPage}|${Size.empty}|${Size.leaderboard}|940,230|900,250|${Size.billboard}|${Size.fabric}|fluid`,
                        ], // Values from file mark: c66fae4e-1d29-467a-a081-caad7a90cacd
                    }}
                    optId={undefined}
                    optClassNames={[]}
                    localStyles={localStyles}
                    positionStyles={css`
                        position: relative;
                    `}
                />
            );
        }
        case 'mostpop': {
            return (
                <AdSlotCore
                    name="mostpop"
                    adTypes={['mpu-banner-ad', 'rendered']}
                    sizeMapping={{
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
                    }}
                    optId={undefined}
                    optClassNames={['js-sticky-mpu']}
                    localStyles={localStyles}
                    positionStyles={css`
                        position: relative;
                    `}
                />
            );
        }
        case 'merchandising-high': {
            return (
                <AdSlotCore
                    name="merchandising-high"
                    adTypes={[]}
                    sizeMapping={{
                        // mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
                        mobile: [
                            `${Size.outOfPage}|${Size.empty}|${Size.merchandisingHigh}|fluid`,
                        ],
                    }}
                    optId={undefined}
                    optClassNames={[]}
                    localStyles={localStyles}
                    positionStyles={css`
                        position: relative;
                    `}
                />
            );
        }
        case 'merchandising': {
            return (
                <AdSlotCore
                    name="merchandising"
                    adTypes={[]}
                    sizeMapping={{
                        // mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
                        mobile: [
                            `${Size.outOfPage}|${Size.empty}|${Size.merchandising}|fluid`,
                        ],
                    }}
                    optId={undefined}
                    optClassNames={[]}
                    localStyles={localStyles}
                    positionStyles={css`
                        position: relative;
                    `}
                />
            );
        }
    }
};

export const MobileStickyContainer: React.FC<{}> = ({}) => {
    return <div className={`mobilesticky-container ${mobileStickyAdStyles}`} />;
};
