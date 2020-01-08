import React from 'react';
import { css } from 'emotion';

import { neutralBorder } from '@root/src/lib/pillars';

import { squigglyImage } from './GuardianLines.squiggly';
import { dottedImage } from './GuardianLines.dotted';

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

const squigglyLines = css`
    background-image: url(${squigglyImage});
    background-repeat: repeat-x;
    background-size: 199px;
    background-position: top;
    min-height: 13px;
`;

const dottedLines = css`
    background-image: url(${dottedImage});
    background-size: 10px;
    min-height: 14px;
`;

type Props = {
    pillar: Pillar;
    effect?: LineEffectType;
    count?: 4 | 8;
};

export const GuardianLines = ({
    pillar,
    effect = 'straight',
    count = 4,
}: Props) => {
    if (effect === 'squiggly') {
        return <div className={squigglyLines} />;
    }
    if (effect === 'dotted') {
        return <div className={dottedLines} />;
    }
    return <div className={lineStyles(pillar, count)} />;
};
