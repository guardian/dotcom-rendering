// ----- Imports ----- //

import React from 'react';
import { Contributor } from 'types/capi';
import { isSingleContributor } from 'types/capi';
import { css, SerializedStyles } from '@emotion/core';
import { transformUrl } from 'utils/asset';

// ----- Styles ----- //

const imageWidth = 68;

const AvatarStyles = (bgColour: string): SerializedStyles => css`
    width: ${imageWidth}px;
    height: ${imageWidth}px;
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
    imageSalt: string;
}

function Avatar({ contributors, bgColour, imageSalt }: AvatarProps): JSX.Element | null {

    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl) {
        const imgSrc = transformUrl(imageSalt, contributor.bylineLargeImageUrl, imageWidth*3);
        return (
            <div css={AvatarStyles(bgColour)}>
                <img src={imgSrc} alt={contributor.webTitle}/>
            </div>
        );
    }
    
    return null;

}


// ----- Exports ----- //

export default Avatar;
