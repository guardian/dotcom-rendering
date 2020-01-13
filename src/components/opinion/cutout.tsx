// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'capi';
import { transformUrl } from 'asset';


// ----- Constants ----- //

const imageWidth = 68;


// ----- Styles ----- //

const Styles = css`
    position: relative;
`;

const ImageStyles = css`
    position: absolute;
    height: 160px;
    right: 0;
    top: -54px;
`;


// ----- Component ----- //

interface Props {
    contributors: Contributor[];
    imageSalt: string;
    className: SerializedStyles;
}

const Cutout = ({ contributors, imageSalt, className }: Props): JSX.Element | null => {
    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl) {
        const imgSrc = transformUrl(imageSalt, contributor.bylineLargeImageUrl, imageWidth*3);
        return (
            <div css={[className, Styles]}>
                <img css={ImageStyles} src={imgSrc} alt={contributor.webTitle}/>
            </div>
        );
    }
    
    return null;

}


// ----- Exports ----- //

export default Cutout;
