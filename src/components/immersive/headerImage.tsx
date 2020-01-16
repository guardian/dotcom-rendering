// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { from } from '@guardian/src-foundations/mq';

import { BlockElement } from 'mapiThriftModels/BlockElement';
import { immersiveImageElement } from 'components/blocks/image';
import { wideContentWidth } from 'styles';
import { Option } from 'types/option';


// ----- Styles ----- //

const Styles = css`
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


// ----- Component ----- //

interface Props {
    image: Option<BlockElement>;
    imageSalt: string;
    className?: SerializedStyles | null;
}

const HeaderImage = ({ className, image, imageSalt }: Props): JSX.Element | null =>
    image.map<JSX.Element | null>(({ imageTypeData, assets }) =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        <div css={[className, Styles]}>
            <figure>
                { immersiveImageElement(imageTypeData.alt, assets, imageSalt) }
            </figure>
        </div>
    ).withDefault(null);


// ----- Exports ----- //

export default HeaderImage;
