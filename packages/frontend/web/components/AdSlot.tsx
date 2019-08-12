// tslint:disable:react-no-dangerous-html

import React from 'react';

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

export const AdSlot: React.FC<{
    name: string;
    adTypes: string[];
    sizeMapping: AdSlotInputSizeMappings;
    showLabel?: boolean;
    refresh?: boolean;
    outOfPage?: boolean;
    optId?: string;
    optClassNames?: string[];
}> = ({
    name,
    adTypes,
    sizeMapping,
    showLabel = true,
    refresh = true,
    outOfPage = false,
    optId,
    optClassNames,
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
            className={makeClassNames(name, adTypes, optClassNames || [])}
            data-link-name={`ad slot ${name}`}
            data-name={name}
            // {...getOptionalProps()}
            {...sizeMappings}
            aria-hidden="true"
        />
    );
};
