// ----- Imports ----- //

import React, {FC, ReactNode} from 'react';
import { css } from '@emotion/core';
import Image, { Props as ImageProps } from 'components/image';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

// ----- Setup ----- //

const sizes = `(min-width: 140px)`;


// ----- Component ----- //

interface Props {
    image: Omit<ImageProps, 'sizes'>;
    children: ReactNode;
}

const styles = css`
    display: block;
    float: left;
    clear: left;
    width: 8.75rem;
    margin: 0 ${remSpace[3]} 0 0;

    ${from.wide} {
        margin-left: calc(-8.75rem - ${remSpace[3]} - ${remSpace[2]});
        margin-right: 0;
        padding: 0;
    }
`;

const BodyImageThumbnail: FC<Props> = ({ image, children }: Props) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} thumbnail={true} />
        {children}
    </figure>;


// ----- Exports ----- //

export default BodyImageThumbnail;
