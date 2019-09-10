// tslint:disable:react-no-dangerous-html

import React from 'react';
import { shouldDisplayAdvertisements } from '@frontend/model/advertisement';
import { css } from 'emotion';
import { textSans, palette } from '@guardian/src-foundations';

const labelStyles = css`
    .ad-slot__label {
        ${textSans({ level: 1 })};
        position: relative;
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
    config: ConfigType;
    className: string;
}> = ({ asps, config, className }) => {
    if (!shouldDisplayAdvertisements(config)) {
        return null;
    }
    return <AdSlotCore {...asps} className={className} />;
};
