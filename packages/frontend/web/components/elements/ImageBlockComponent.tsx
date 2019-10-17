import React from 'react';
import { css } from 'emotion';
import { Picture, PictureSource } from '@frontend/web/components/Picture';
import { Caption } from '@frontend/web/components/Caption';

import { wide, tablet, leftCol } from '@guardian/src-foundations';

const widths = [660, 480, 0];

const bestFor = (desiredWidth: number, inlineSrcSets: SrcSet[]): SrcSet => {
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
    forWeighting: Weighting,
): SrcSet[] =>
    imageSources.filter(({ weighting }) => weighting === forWeighting)[0]
        .srcSet;

const makeSources = (imageSources: ImageSource[]): PictureSource[] => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, 'inline');
    const sources: PictureSource[] = [];

    // TODO: ideally the imageSources array will come from frontend with prebaked URLs for
    // hidpi images.
    // Until that happens, here we're manually injecting (inadequate) <source> elements for
    // those images, albeit without the necessary query params for hidpi images :(
    widths.forEach(width => {
        sources.push(makeSource(true, width, bestFor(width, inlineSrcSets)));
        sources.push(makeSource(false, width, bestFor(width, inlineSrcSets)));
    });

    return sources;
};

const makeSource = (
    hidpi: boolean,
    minWidth: number,
    srcSet: SrcSet,
): PictureSource => {
    return {
        hidpi,
        minWidth,
        width: srcSet.width,
        srcset: `${srcSet.src} ${hidpi ? srcSet.width * 2 : srcSet.width}w`,
    };
};

const getFallback: (imageSources: ImageSource[]) => string = imageSources => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, 'inline');

    return bestFor(300, inlineSrcSets).src;
};

const imageCss = {
    inline: css`
        margin-top: 16px;
        margin-bottom: 12px;
    `,

    supporting: css`
        ${tablet} {
            position: relative;
            float: left;
            width: 300px;
            margin-top: 6px;
            margin-bottom: 12px;
            margin-right: 20px;
            line-height: 0;
        }
        ${leftCol} {
            margin-left: -160px;
        }
        ${wide} {
            width: 380px;
            margin-left: -240px;
        }
    `,

    // TODO: immersive is pending review of different article types
    immersive: css``,

    // TODO: showcase is only a partial implementation as sometimes showcase images
    //       appear differently based on where they appear in the article
    //       See top image for: https://www.theguardian.com/stage/2019/oct/01/hammed-animashaun-nick-hytner-dream-master-harold-and-the-boys-national-theatre-london
    showcase: css`
        position: relative;
        margin-top: 16px;
        margin-bottom: 12px;
        ${leftCol} {
            position: relative;
            margin-bottom: 16px;
            margin-left: -160px;
        }
        ${wide} {
            margin-left: -240px;
        }
    `,

    thumbnail: css`
        float: left;
        clear: left;
        margin-bottom: 0;
        width: 120px;
        margin-right: 20px;
        margin-top: 6px;
        ${tablet} {
            margin-right: 20px;
        }
        ${wide} {
            margin-left: -160px;
        }
        ${wide} {
            margin-left: -240px;
        }
        ${leftCol} {
            margin-left: -160px;
        }
        ${leftCol} {
            position: relative;
        }
        ${tablet} {
            width: 140px;
        }
    `,

    // TODO:
    'half-width': css``,
};

const decidePosition = (role: RoleType) => {
    switch (role) {
        case 'inline':
            return imageCss.inline;
        case 'supporting':
            return imageCss.supporting;
        case 'immersive':
            return imageCss.immersive;
        case 'showcase':
            return imageCss.showcase;
        case 'thumbnail':
            return imageCss.thumbnail;
        case 'half-width':
            return imageCss['half-width'];
        default:
            return imageCss.inline;
    }
};

export const ImageBlockComponent: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const sources = makeSources(element.imageSources);
    const { role } = element;
    return (
        <div className={decidePosition(role)}>
            <Caption
                captionText={element.data.caption || ''}
                pillar={pillar}
                dirtyHtml={true}
                credit={element.data.credit}
                displayCredit={true}
            >
                <Picture
                    sources={sources}
                    alt={element.data.alt || ''}
                    src={getFallback(element.imageSources)}
                />
            </Caption>
        </div>
    );
};
