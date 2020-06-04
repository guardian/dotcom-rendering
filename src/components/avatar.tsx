// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';
import { Format } from 'format';
import { getPillarStyles } from 'pillarStyles';
import Img from 'components/img';
import { remSpace } from '@guardian/src-foundations';


// ----- Setup ----- //

const dimensions = '4rem';


// ----- Component ----- //

interface Props extends Format {
    contributors: Contributor[];
}

const styles = (background: string): SerializedStyles => css`
    width: ${dimensions};
    height: ${dimensions};
    clip-path: circle(50%);
    object-fit: cover;
    background: ${background};
    margin-right: ${remSpace[3]};
    margin-top: ${remSpace[1]};
`;

const getStyles = ({ pillar }: Format): SerializedStyles => {
    const colours = getPillarStyles(pillar);
    return styles(colours.inverted);
}

const Avatar: FC<Props> = ({ contributors, ...format }: Props) => {
    const [contributor] = contributors;

    if (!isSingleContributor(contributors)) {
        return null;
    }

    return contributor.image.fmap<ReactElement | null>(image =>
        <Img
            image={image}
            sizes={dimensions}
            className={getStyles(format)}
        />
    ).withDefault(null);
}


// ----- Exports ----- //

export default Avatar;
