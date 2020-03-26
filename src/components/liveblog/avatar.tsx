// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';
import { src } from 'image';
import { ImageMappings } from 'components/shared/page';


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
    imageMappings: ImageMappings;
}

function Avatar({ contributors, bgColour, imageMappings }: AvatarProps): JSX.Element | null {
    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl) {
        const imgSrc = src(imageMappings, contributor.bylineLargeImageUrl, imageWidth*3);
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
