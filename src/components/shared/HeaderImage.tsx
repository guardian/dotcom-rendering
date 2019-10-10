import React from 'react';
import { css, SerializedStyles } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';
import { Asset } from 'types/capi-thrift-models';
import { imageElement } from 'components/blocks/image';
import { until } from '@guardian/src-foundations';

const headerImageStyles = css`
    figure {
        position: relative;
        width: 620px;

        ${until.wide} {
            width: 100%;
        }
    }

    img {
        width: 620px;
        display: block;

        ${until.wide} {
            width: 100%;
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
