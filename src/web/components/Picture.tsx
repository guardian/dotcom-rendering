import React from 'react';
// IE 9 needs this workaround as per https://scottjehl.github.io/picturefill/

export interface PictureSource {
    width: number;
    minWidth: number;
    srcset: string;
    hidpi: boolean;
}

type Props = {
    sources: PictureSource[];
    alt: string;
    src: string;
    height: string;
    width: string;
    isLazy?: boolean;
}

const mq: (source: PictureSource) => string = (source) =>
    source.hidpi
        ? `(min-width: ${source.minWidth}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${source.minWidth}px) and (min-resolution: 120dpi)`
        : `(min-width: ${source.minWidth}px)`;

const forSource: (source: PictureSource) => string = (source) =>
    ` <source media="${mq(source)}" sizes="${source.width}px" srcset="${
        source.srcset
    }" />`;

export const Picture = ({ sources, alt, src, height, width, isLazy = true }: Props) => {
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
                    isLazy && !Picture.disableLazyLoading ? 'loading="lazy"' : ''
                } />`,
            }}
        />
    );
};

// We use disableLazyLoading to decide if we want to turn off lazy loading of images site wide. We use this
// to prevent false negatives on Chromatic snapshots (see /.storybook/config)
Picture.disableLazyLoading = false;
