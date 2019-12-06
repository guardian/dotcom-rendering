import React from 'react';

import { css, SerializedStyles } from '@emotion/core';
import { Contributor, isSingleContributor } from 'capi';
import { transformUrl } from 'asset';

const OpinionCutoutStyles = css`
    position: relative;
`;

const ImageStyles = css`
    position: absolute;
    height: 160px;
    right: 0;
    top: -54px;
`;

interface OpinionCutoutProps {
    contributors: Contributor[];
    imageSalt: string;
    className: SerializedStyles;
}

const OpinionCutout = ({
    contributors,
    imageSalt,
    className
}: OpinionCutoutProps): JSX.Element | null => {
    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl) {
        const imgSrc = transformUrl(imageSalt, contributor.bylineLargeImageUrl, 68*3);
        return (
            <div css={[className, OpinionCutoutStyles]}>
                <img css={ImageStyles} src={imgSrc} alt={contributor.webTitle}/>
            </div>
        );
    }
    
    return null;

}

export default OpinionCutout;
