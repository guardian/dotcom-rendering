import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { darkModeCss, wideContentWidth, wideColumnWidth, baseMultiply } from 'styles';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Pillar } from 'pillar';

const BaseStyles = css`
    height: 12px;
    margin-bottom: 4px;
    margin-top: 0;
    border: none;

    ${from.wide} {
        width: ${wideContentWidth}px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const KeylineLiveblogStyles = css`
    background-image: repeating-linear-gradient(${palette.neutral[86]}, ${palette.neutral[86]} 1px, transparent 1px, transparent 3px);
    opacity: .4;
    margin-right: unset;

    ${from.wide} {
        margin-left: ${wideColumnWidth + baseMultiply(1)}px;
    }
`;

const KeylineNewsStyles = css`
    background-image: repeating-linear-gradient(${palette.neutral[86]}, ${palette.neutral[86]} 1px, transparent 1px, transparent 3px);
`;

const KeylineOpinionStyles = css`
    background-image: repeating-linear-gradient(${palette.neutral[86]}, ${palette.neutral[86]} 1px, transparent 1px, transparent 3px);
    height: 24px;
    margin-top: 84px;
`;

const KeylineDarkStyles = darkModeCss`
    background-image: repeating-linear-gradient(${palette.neutral[20]}, ${palette.neutral[20]} 1px, transparent 1px, transparent 3px);
`;


export const Keyline = ({ pillar, type }: { pillar: Pillar; type: string }): JSX.Element => {
    const SelectedKeylineStyles = ((pillar, type): SerializedStyles => {
        if (type === 'liveblog') return KeylineLiveblogStyles;
        switch (pillar) {
            case Pillar.opinion:
                return KeylineOpinionStyles;
            default:
                return KeylineNewsStyles;
        }})(pillar, type);
    
    return <hr css={[BaseStyles, SelectedKeylineStyles, KeylineDarkStyles]} />
}
