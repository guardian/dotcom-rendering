// ----- Imports ----- //

import React, { ReactElement, FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';
import { map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';


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

const Avatar: FC<AvatarProps> = ({ contributors, bgColour }) => {
    const [contributor] = contributors;

    if (!isSingleContributor(contributors)) {
        return null;
    }

    return pipe2(
        contributor.image,
        map(image =>
            <div css={AvatarStyles(bgColour)}>
                <img
                    srcSet={image.srcset}
                    src={image.src}
                    alt={contributor.name}
                    sizes={imageWidth}
                />
            </div>
        ),
        withDefault<ReactElement | null>(null),
    );
}


// ----- Exports ----- //

export default Avatar;
