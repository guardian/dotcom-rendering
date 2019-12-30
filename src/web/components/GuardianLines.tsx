import React from 'react';
import { css } from 'emotion';

import { neutralBorder } from '@root/src/lib/pillars';

import { squigglyImage } from './GuardianLines.squiggly';

const lineStyles = (pillar: Pillar, count: 4 | 8) => css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${neutralBorder(pillar)},
        ${neutralBorder(pillar)} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px ${count === 4 ? '13px' : '29px'};
    height: ${count === 4 ? '13px' : '29px'};
`;

const squigglyLines = (pillar: Pillar) => css`
    background-image: url(${squigglyImage});
    background-repeat: repeat-x;
    background-size: 199px;
    background-position: top;
    min-height: 13px;
`;

type Props = {
    squiggly?: boolean;
    pillar: Pillar;
    count?: 4 | 8;
};

export const GuardianLines = ({
    squiggly = false,
    pillar,
    count = 4,
}: Props) => {
    if (squiggly) {
        return <div className={squigglyLines(pillar)} />;
    }
    return <div className={lineStyles(pillar, count)} />;
};
