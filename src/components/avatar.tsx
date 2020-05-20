// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';
import { Format } from 'format';
import { getPillarStyles } from 'pillarStyles';


// ----- Setup ----- //

const dimensions = '4rem';


// ----- Component ----- //

interface Props extends Format {
    contributors: Contributor[];
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

const Avatar: FC<Props> = ({ contributors, className, ...format }: Props) => {
    const [contributor] = contributors;

    if (!isSingleContributor(contributors)) {
        return null;
    }

    return contributor.image.fmap<ReactElement | null>(image =>
        <img
            css={[getStyles(format), className]}
            srcSet={image.srcset}
            alt={contributor.name}
            sizes={dimensions}
            src={image.src}
        />
    ).withDefault(null);
}


// ----- Exports ----- //

export default Avatar;
