import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { darkModeCss, wideContentWidth, wideColumnWidth } from 'styles';
import { neutral } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { Design } from 'format';

const BaseStyles = css`
    height: 10px;
    margin-bottom: 0;
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
        margin-left: ${wideColumnWidth}px;
    }
`;

const KeylineNewsStyles = css`
    background-image: repeating-linear-gradient(${neutral[86]}, ${neutral[86]} 1px, transparent 1px, transparent 3px);
`;

const KeylineOpinionStyles = css`
    background-image: repeating-linear-gradient(${neutral[86]}, ${neutral[86]} 1px, transparent 1px, transparent 3px);
    height: 24px;
    margin-top: 90px;
`;

const KeylineDarkStyles = darkModeCss`
    background-image: repeating-linear-gradient(${neutral[20]}, ${neutral[20]} 1px, transparent 1px, transparent 3px);
`;

type Props = {
    design: Design;
};

export const Keyline = ({ design }: Props): JSX.Element => {
    const SelectedKeylineStyles = ((design): SerializedStyles => {
        switch(design) {
            case Design.Live:
                return KeylineLiveblogStyles
            case Design.Comment:
                return KeylineOpinionStyles
            default:
                return KeylineNewsStyles;
        }})(design);
    
    return <hr css={[BaseStyles, SelectedKeylineStyles, KeylineDarkStyles]} />
}
