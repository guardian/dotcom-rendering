import React from 'react';
import { css, SerializedStyles } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';
import { BlockElement } from 'types/capi-thrift-models';
import { imageElement } from 'components/blocks/image';
import { wide } from '@guardian/src-foundations';
import { wideContentWidth } from 'styles';
import { Option } from 'types/Option';

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
    image: Option<BlockElement>;
    imageSalt: string;
    className?: SerializedStyles | null;
}

const HeaderImage = ({ className, image, imageSalt }: HeaderImageProps): JSX.Element | null => {

    const headerImage: Option<JSX.Element | null> = image.map(({ imageTypeData, assets }) =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        <div css={[className, headerImageStyles]}>
            <figure>
                { imageElement(imageTypeData.alt, assets, imageSalt) }
                <HeaderImageCaption caption={imageTypeData.caption} credit={imageTypeData.credit}/>
            </figure>
        </div>
    );

    // Needed to provide TypeScript with enough type information.
    return headerImage.withDefault(null);

}

export default HeaderImage;
