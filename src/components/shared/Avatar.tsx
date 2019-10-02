// ----- Imports ----- //

import React from 'react';
import { Contributor } from 'types/Capi';
import { isSingleContributor } from 'utils/capi';
import { css, SerializedStyles } from '@emotion/core';


// ----- Styles ----- //

const AvatarStyles = (bgColour: string): SerializedStyles => css`
    width: 68px;
    height: 68px;
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

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl) {
        return (
            <div css={AvatarStyles(bgColour)}>
                <img src={contributor.bylineLargeImageUrl} alt={contributor.webTitle}/>
            </div>
        );
    }
    
    return null;

}


// ----- Exports ----- //

export default Avatar;
