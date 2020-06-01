// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';


// ----- Styles ----- //

const imageWidth = '4rem';

const AvatarStyles = (bgColour: string): SerializedStyles => css`
    width: ${imageWidth};
    height: ${imageWidth};
    background-color: ${bgColour};
    border-radius: 100%;
    float: left;
    margin: 0 12px 12px 0;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
        transform-origin: top center;
        transform: scale(1.6) translate(-1px, -1px);
    }
`;


// ----- Component ----- //

interface AvatarProps {
    contributors: Contributor[];
    bgColour: string;
}

function Avatar({ contributors, bgColour }: AvatarProps): JSX.Element | null {
    const [contributor] = contributors;

    if (!isSingleContributor(contributors)) {
        return null;
    }

    return contributor.image.fmap<ReactElement | null>(image =>
        <div css={AvatarStyles(bgColour)}>
            <img
                srcSet={image.srcset}
                src={image.src}
                alt={contributor.name}
                sizes={imageWidth}
            />
        </div>
    ).withDefault(null);
}


// ----- Exports ----- //

export default Avatar;
