// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';
import { src } from 'image';
import { ImageMappings } from 'components/shared/page';


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
    imageMappings: ImageMappings;
    className: SerializedStyles;
}

const Cutout = ({ contributors, imageMappings, className }: Props): JSX.Element | null => {
    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl) {
        const imgSrc = src(imageMappings, contributor.bylineLargeImageUrl, imageWidth*3);
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
