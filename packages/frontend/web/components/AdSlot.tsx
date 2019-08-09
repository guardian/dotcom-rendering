// tslint:disable:react-no-dangerous-html

import React from 'react';

export const AdSlot: React.FC<{
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
    const dataSizeMappings = Object.keys(sizeMapping).reduce(
        (
            mappings: {
                [key: string]: string;
            },
            key,
        ) => {
            mappings[`data-${key}`] = sizeMapping[key].join('|');

            return mappings;
        },
        {},
    );

    const getClassNames = (): string => {
        const baseClassNames = ['js-ad-slot', 'ad-slot', `ad-slot--${name}`];
        const adTypeClassNames = adTypes.map(adType => `ad-slot--${adType}`);

        return baseClassNames
            .concat(adTypeClassNames, optClassNames || [])
            .join(' ');
    };

    // const getOptionalProps = (): object => ({
    //     ...(showLabel && { 'data-label': true }),
    //     ...(refresh && { 'data-refresh': true }),
    //     ...(outOfPage && { 'data-out-of-page': true }),
    // });

    return (
        <div
            id={`dfp-ad--${optId || name}`}
            className={getClassNames()}
            data-link-name={`ad slot ${name}`}
            data-name={name}
            // {...getOptionalProps()}
            {...dataSizeMappings}
            aria-hidden="true"
        />
    );
};
