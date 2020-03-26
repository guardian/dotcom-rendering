// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';

import { srcsetWithWidths } from 'image';
import { Contributor, isSingleContributor } from 'contributor';
import { Format } from 'item';
import { getPillarStyles } from 'pillar';
import { ImageMappings } from 'components/shared/page';


// ----- Setup ----- //

const dimensions = '4rem';

const srcset = srcsetWithWidths([32, 64, 128, 192, 256]);


// ----- Component ----- //

interface Props extends Format {
    contributors: Contributor[];
    imageMappings: ImageMappings;
}

const styles = (background: string): SerializedStyles => css`
    width: ${dimensions};
    height: ${dimensions};
    clip-path: circle(50%);
    object-fit: cover;
    background: ${background};
    margin-right: ${remSpace[3]};
`;

const getStyles = ({ pillar }: Format): SerializedStyles => {
    const colours = getPillarStyles(pillar);

    return styles(colours.inverted);
}

const Avatar: FC<Props> = ({ contributors, imageMappings, ...format }) => {
    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl !== undefined) {
        return (
            <img
                css={getStyles(format)}
                srcSet={srcset(contributor.bylineLargeImageUrl, imageMappings)}
                alt={contributor.webTitle}
                sizes={dimensions}
            />
        );
    }

    return null;
}


// ----- Exports ----- //

export default Avatar;
