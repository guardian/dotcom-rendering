import React from 'react';
import { css, SerializedStyles } from '@emotion/core'

import HeaderImageCaption, { captionId } from './HeaderImageCaption';
import { BlockElement } from 'types/capi-thrift-models';
import { imageElement } from 'components/blocks/image';
import { from } from '@guardian/src-foundations/mq';
import { wideContentWidth, basePx } from 'styles';
import { Option } from 'types/Option';

const headerImageStyles = css`
    figure {
        position: relative;

        ${from.wide} {
            width: ${wideContentWidth}px;
        }
    }

    img {
        display: block;
        width: 100%;

        ${from.wide} {
            width: ${wideContentWidth}px;
        }
    }

    margin-bottom: ${basePx(1)};
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
            <figure aria-labelledby={captionId}>
                { imageElement(imageTypeData.alt, assets, imageSalt) }
                <HeaderImageCaption caption={imageTypeData.caption} credit={imageTypeData.credit}/>
            </figure>
        </div>
    );

    // Needed to provide TypeScript with enough type information.
    return headerImage.withDefault(null);

}

export default HeaderImage;
