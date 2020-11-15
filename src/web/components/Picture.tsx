import React from 'react';
// IE 9 needs this workaround as per https://scottjehl.github.io/picturefill/

type Props = {
    imageSources: ImageSource[];
    role: RoleType;
    alt: string;
    height: string;
    width: string;
    isLazy?: boolean;
};

interface PictureSource {
    width: number;
    minWidth: number;
    srcset: string;
    hidpi: boolean;
}

const mq: (source: PictureSource) => string = (source) =>
    source.hidpi
        ? `(min-width: ${source.minWidth}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${source.minWidth}px) and (min-resolution: 120dpi)`
        : `(min-width: ${source.minWidth}px)`;

const forSource: (source: PictureSource) => string = (source) =>
    ` <source media="${mq(source)}" sizes="${source.width}px" srcset="${
        source.srcset
    }" />`;

const selectScrSetItemForWidth = (
    desiredWidth: number,
    inlineSrcSets: SrcSetItem[],
): SrcSetItem => {
    const sorted = inlineSrcSets.sort((a, b) => b.width - a.width);

    return sorted.reduce((best, current) => {
        if (current.width < best.width && current.width >= desiredWidth) {
            return current;
        }

        return best;
    });
};

const getSrcSetsForWeighting = (
    imageSources: ImageSource[],
    forWeighting: RoleType,
): SrcSetItem[] =>
    imageSources.filter(
        ({ weighting }) =>
            // Use toLowerCase to handle cases where we have halfWidth comparing to halfwidth
            weighting.toLowerCase() === forWeighting.toLowerCase(),
    )[0].srcSet;

const makePictureSource = (
    hidpi: boolean,
    minWidth: number,
    srcSet: SrcSetItem,
): PictureSource => {
    return {
        hidpi,
        minWidth,
        width: srcSet.width,
        srcset: `${srcSet.src} ${hidpi ? srcSet.width * 2 : srcSet.width}w`,
    };
};

const makeSources = (
    imageSources: ImageSource[],
    role: RoleType,
): PictureSource[] => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, role);
    const sources: PictureSource[] = [];
    inlineSrcSets
        .map((item) => item.width)
        .forEach((width) => {
            sources.push(
                makePictureSource(
                    true,
                    width,
                    selectScrSetItemForWidth(width, inlineSrcSets),
                ),
            );
            sources.push(
                makePictureSource(
                    false,
                    width,
                    selectScrSetItemForWidth(width, inlineSrcSets),
                ),
            );
        });

    return sources;
};

const getFallback: (imageSources: ImageSource[]) => string = (imageSources) => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, 'inline');

    return selectScrSetItemForWidth(300, inlineSrcSets).src;
};

export const Picture = ({
    imageSources,
    role,
    alt,
    height,
    width,
    isLazy = true,
}: Props) => {
    const sources = makeSources(imageSources, role);
    const src = getFallback(imageSources);
    return (
        // https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
        // why did we put `style="vertical-align: middle;"` inside the img tag
        <picture
            dangerouslySetInnerHTML={{
                __html: `<!--[if IE 9]><video style="display: none;"><![endif]-->${sources
                    .map(forSource)
                    .join(
                        '',
                    )}<!--[if IE 9]></video><![endif]--><img style="vertical-align: middle;" itemprop="contentUrl" alt="${alt}" src="${src}" height="${height}" width="${width}" ${
                    isLazy ? 'loading="lazy"' : ''
                } />`,
            }}
        />
    );
};
