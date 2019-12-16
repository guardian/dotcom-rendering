import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { BlockElement } from 'capiThriftModels';
import { immersiveImageElement } from 'components/blocks/image';
import { from } from '@guardian/src-foundations/mq';
import { wideContentWidth } from 'styles';
import { Option } from 'types/option';

const headerImageStyles = css`
    figure {
        position: relative;

        ${from.wide} {
            width: ${wideContentWidth}px;
        }
    }

    img {
        display: block;
        height: 80vh;
        object-fit: cover;
        width: 100vw;

        ${from.wide} {
            width: ${wideContentWidth}px;
        }
    }
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
            <figure aria-labelledby={imageTypeData.alt}>
                { immersiveImageElement(imageTypeData.alt, assets, imageSalt) }
            </figure>
        </div>
    );

    // Needed to provide TypeScript with enough type information.
    return headerImage.withDefault(null);

}

export default HeaderImage;
