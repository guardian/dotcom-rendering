/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { css } from 'emotion';

import { border, neutral, text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

type Props = {
    asps: AdSlotParameters;
    localStyles?: string;
    isSticky?: boolean;
    heightToStick?: string;
};

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
    showLabel?: boolean;
    refresh?: boolean;
    outOfPage?: boolean;
    optId?: string;
    optClassNames?: string[];
    localStyles?: string;
    isSticky?: boolean;
}> = ({
    name,
    adTypes,
    sizeMapping,
    // TODO: Do we need to respect these three properties?
    // showLabel = true,
    // refresh = true,
    // outOfPage = false,
    optId,
    optClassNames,
    localStyles,
    isSticky,
}) => {
    // Will export `getOptionalProps` as a function if/when needed - Pascal.
    // const getOptionalProps = (): object => ({
    //     ...(showLabel && { 'data-label': true }),
    //     ...(refresh && { 'data-refresh': true }),
    //     ...(outOfPage && { 'data-out-of-page': true }),
    // });

    const postionStyles = isSticky
        ? css`
              position: sticky;
              top: 0;
          `
        : css`
              position: relative;
          `;

    const sizeMappings = makeInternalSizeMappings(sizeMapping);
    return (
        <div
            id={`dfp-ad--${optId || name}`}
            className={`${makeClassNames(
                name,
                adTypes,
                optClassNames || [],
            )} ${postionStyles} ${localStyles} ${labelStyles}`}
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
    asps,
    localStyles,
    isSticky,
    heightToStick,
}) => {
    if (isSticky) {
        return (
            <div
                className={css`
                    position: static;
                    height: ${heightToStick || '100%'};
                `}
            >
                <AdSlotCore {...asps} isSticky={true} />
            </div>
        );
    }
    return <AdSlotCore {...asps} localStyles={localStyles} />;
};

export const MobileStickyContainer: React.FC<{}> = ({}) => {
    return <div className={`mobilesticky-container ${mobileStickyAdStyles}`} />;
};
