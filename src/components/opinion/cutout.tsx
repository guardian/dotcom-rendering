// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';


// ----- Styles ----- //

const styles = css`
    position: relative;
`;

const imageStyles = css`
    position: absolute;
    height: 160px;
    right: 0;
    top: -48px;
`;


// ----- Component ----- //

interface Props {
    contributors: Contributor[];
    className: SerializedStyles;
}

const Cutout = ({ contributors, className }: Props): JSX.Element | null => {
    const [contributor] = contributors;

    if (!isSingleContributor(contributors)) {
        return null;
    }

    return contributor.image.fmap<ReactElement | null>(image =>
        <div css={[className, styles]}>
            <img
                css={imageStyles}
                srcSet={image.srcset}
                src={image.src}
                alt={contributor.name}
                sizes="6rem"
            />
        </div>
    ).withDefault(null);
}


// ----- Exports ----- //

export default Cutout;
