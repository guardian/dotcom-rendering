import React from 'react';
import { css, SerializedStyles } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';
import { Asset } from 'types/capi-thrift-models';
import { imageElement } from 'components/blocks/image';
import { wide } from '@guardian/src-foundations';
import { wideContentWidth } from 'styles';

const headerImageStyles = css`
    figure {
        position: relative;

        ${wide} {
            width: ${wideContentWidth}px;
        }
    }

    img {
        display: block;
        width: 100%;

        ${wide} {
            width: ${wideContentWidth}px;
        }
    }

    margin-bottom: 8px;
`;

interface HeaderImageProps {
    assets: Asset[] | null;
    imageSalt: string;
    className?: SerializedStyles | null;
}

const HeaderImage = ({ className, assets, imageSalt }: HeaderImageProps): JSX.Element | null => {
    if (!assets) return null;

    const { typeData: {caption, credit, altText} } = assets[0];

    return (
        <div css={[className, headerImageStyles]}>
            <figure>
                { imageElement(altText, assets, imageSalt) }
                < HeaderImageCaption caption={caption} credit={credit}/>
            </figure>
        </div>
    )
}

export default HeaderImage;
