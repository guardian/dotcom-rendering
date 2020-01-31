// tslint:disable:react-no-dangerous-html

import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

export const labelStyles = css`
    .ad-slot__label {
        ${textSans.xsmall()};
        height: 24px;
        background-color: ${palette.neutral[97]};
        padding: 0 8px;
        border-top: 1px solid ${palette.neutral[86]};
        color: ${palette.neutral[46]};
        text-align: left;
        box-sizing: border-box;
    }

    .ad-slot__close-button {
        display: none;
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
        stroke: ${palette.neutral[7]};
        fill: ${palette.neutral[7]};
        stroke-linecap: round;
        stroke-width: 0;
        text-align: center;
    }
    .ad-slot--mobile-sticky .ad-slot__label .ad-slot__close-button {
        display: block;
    }
    .ad-slot__close-button__x {
        stroke: ${palette.neutral[7]};
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
        background-color: ${palette.neutral[97]};
        padding: 0 0.5rem;
        border-top: 0.0625rem solid ${palette.neutral[86]};
        color: ${palette.neutral[60]};
        text-align: left;
        box-sizing: border-box;
        ${textSans.xsmall()};
    }
`;
export interface AdSlotParameters {
    name: string;
    adTypes: string[];
    sizeMapping: {
        [key: string]: string[];
    };
    showLabel?: boolean;
    refresh?: boolean;
    outOfPage?: boolean;
    optId?: string;
    optClassNames?: string[];
}

export interface AdSlotInputSizeMappings {
    [key: string]: string[];
}

export interface AdSlotInternalSizeMappings {
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
    name: string,
    adTypes: string[],
    optClassNames: string[],
): string => {
    const baseClassNames = ['js-ad-slot', 'ad-slot', `ad-slot--${name}`];
    const adTypeClassNames = adTypes.map(adType => `ad-slot--${adType}`);
    return baseClassNames.concat(adTypeClassNames, optClassNames).join(' ');
};

export const AdSlotCore: React.FC<{
    name: string;
    adTypes: string[];
    sizeMapping: AdSlotInputSizeMappings;
    showLabel?: boolean;
    refresh?: boolean;
    outOfPage?: boolean;
    optId?: string;
    optClassNames?: string[];
    className: string;
}> = ({
    name,
    adTypes,
    sizeMapping,
    showLabel = true,
    refresh = true,
    outOfPage = false,
    optId,
    optClassNames,
    className,
}) => {
    // Will export `getOptionalProps` as a function if/when needed - Pascal.
    // const getOptionalProps = (): object => ({
    //     ...(showLabel && { 'data-label': true }),
    //     ...(refresh && { 'data-refresh': true }),
    //     ...(outOfPage && { 'data-out-of-page': true }),
    // });

    const sizeMappings = makeInternalSizeMappings(sizeMapping);
    return (
        <div
            id={`dfp-ad--${optId || name}`}
            className={`${makeClassNames(
                name,
                adTypes,
                optClassNames || [],
            )} ${className} ${labelStyles}`}
            data-link-name={`ad slot ${name}`}
            data-name={name}
            // {...getOptionalProps()}
            {...sizeMappings}
            aria-hidden="true"
        />
    );
};

export const AdSlot: React.FC<{
    asps: AdSlotParameters;
    className: string;
}> = ({ asps, className }) => {
    return <AdSlotCore {...asps} className={className} />;
};

export const MobileStickyContainer: React.FC<{}> = ({}) => {
    return <div className={`mobilesticky-container ${mobileStickyAdStyles}`} />;
};
