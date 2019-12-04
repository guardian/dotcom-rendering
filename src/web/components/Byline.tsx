import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

type Props = {
    text: string;
    pillar: Pillar;
    size: SmallHeadlineSize;
};

const bylineStyles = (colour: string, size: SmallHeadlineSize) => css`
    display: block;
    color: ${colour};
    ${headline[size]()};
    font-style: italic;
`;

export const Byline = ({ text, pillar, size }: Props) => {
    return (
        <span className={bylineStyles(palette[pillar].main, size)}>{text}</span>
    );
};
