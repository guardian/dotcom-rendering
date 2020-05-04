// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { textSans } from 'styles';
import { Format, Design } from '@guardian/types/Format';

// ----- Component ----- //

interface Props {
    children?: ReactNode;
    format: Format;
}

const styles = (design: Design): SerializedStyles => {
    const advertisementFeature = design === Design.AdvertisementFeature
        ? textSans
        : null;

    return css`
        ${body.medium()}
        overflow-wrap: break-word;
        margin: 0 0 ${remSpace[3]};

        ${advertisementFeature}
    `;
}

const Paragraph: FC<Props> = ({ children, format }: Props) =>
    <p css={styles(format.design)}>{children}</p>;


// ----- Exports ----- //

export default Paragraph;
