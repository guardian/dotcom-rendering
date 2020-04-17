// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { srcsetWithWidths, src } from 'image';
import { Contributor, isSingleContributor } from 'contributor';
import { Format } from 'format';
import { getPillarStyles } from 'pillarStyles';
import { ImageMappings } from 'components/shared/page';


// ----- Setup ----- //

const dimensions = '4rem';

const srcset = srcsetWithWidths([32, 64, 128, 192, 256]);
const defaultSrcWidth = 64;


// ----- Component ----- //

interface Props extends Format {
    contributors: Contributor[];
    imageMappings: ImageMappings;
    className?: SerializedStyles;
}

const styles = (background: string): SerializedStyles => css`
    width: ${dimensions};
    height: ${dimensions};
    clip-path: circle(50%);
    object-fit: cover;
    background: ${background};
`;

const getStyles = ({ pillar }: Format): SerializedStyles => {
    const colours = getPillarStyles(pillar);

    return styles(colours.inverted);
}

const Avatar: FC<Props> = ({ contributors, imageMappings, className, ...format }: Props) => {
    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl !== undefined) {
        return (
            <img
                css={[getStyles(format), className]}
                srcSet={srcset(contributor.bylineLargeImageUrl, imageMappings)}
                alt={contributor.webTitle}
                sizes={dimensions}
                src={src(imageMappings, contributor.bylineLargeImageUrl, defaultSrcWidth)}
            />
        );
    }

    return null;
}


// ----- Exports ----- //

export default Avatar;
