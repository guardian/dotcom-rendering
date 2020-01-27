import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { darkModeCss, wideContentWidth, wideColumnWidth, baseMultiply } from 'styles';
import { neutral } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { Layout } from 'article';

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
    background-image: repeating-linear-gradient(${neutral[86]}, ${neutral[86]} 1px, transparent 1px, transparent 3px);
    opacity: .4;
    margin-right: unset;

    ${from.wide} {
        margin-left: ${wideColumnWidth + baseMultiply(1)}px;
    }
`;

const KeylineNewsStyles = css`
    background-image: repeating-linear-gradient(${neutral[86]}, ${neutral[86]} 1px, transparent 1px, transparent 3px);
`;

const KeylineOpinionStyles = css`
    background-image: repeating-linear-gradient(${neutral[86]}, ${neutral[86]} 1px, transparent 1px, transparent 3px);
    height: 24px;
    margin-top: 84px;
`;

const KeylineDarkStyles = darkModeCss`
    background-image: repeating-linear-gradient(${neutral[20]}, ${neutral[20]} 1px, transparent 1px, transparent 3px);
`;

type Props = {
    layout: Layout;
};

export const Keyline = ({ layout }: Props): JSX.Element => {
    const SelectedKeylineStyles = ((layout): SerializedStyles => {
        switch(layout) {
            case Layout.Liveblog:
                return KeylineLiveblogStyles
            case Layout.Opinion:
                return KeylineOpinionStyles
            default:
                return KeylineNewsStyles;
        }})(layout);
    
    return <hr css={[BaseStyles, SelectedKeylineStyles, KeylineDarkStyles]} />
}
