import React from 'react';
import { css } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';
import { Asset } from 'types/capi-thrift-models';
import { imageElement } from 'components/blocks/image';

const headerImageStyles = css`
    position: relative;
    img {
        width: 100%;
        display: block;
    }

    margin-bottom: 8px;
`;

interface HeaderImageProps {
    assets: Asset[] | null;
    imageSalt: string;
}

const HeaderImage = ({ assets, imageSalt }: HeaderImageProps): JSX.Element | null => {
    if (!assets) return null;

    const { typeData: {caption, credit, altText} } = assets[0];

    return (
        <div css={headerImageStyles}>
            { imageElement(altText, assets, imageSalt) }
            < HeaderImageCaption caption={caption} credit={credit}/>
        </div>
    )
}

export default HeaderImage;
