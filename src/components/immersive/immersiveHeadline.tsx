import React from 'react';
import { basePx, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const HeadlineStyles = css`
    padding: ${basePx(.5, 1, 3, 1)};
    background: ${palette.neutral[7]};
    position: relative;
    margin-top: -78px;

    ${headlineFont}

    h1 {
        font-weight: 700;
        ${headlineFontStyles}
        color: ${palette.neutral[100]};
    }

    address a {
        font-style: italic;
        font-weight: 100;
        ${headlineFontStyles}
        color: ${palette.opinion.main};
        text-decoration: none;
    }
`;

const HeadlineDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};
`;

interface ImmersiveHeadlineProps {
    headline: string;
}

const ImmersiveHeadline = ({
    headline
}: ImmersiveHeadlineProps): JSX.Element =>
    <div css={[HeadlineStyles, HeadlineDarkStyles]}>
        <h1>{headline}</h1>
    </div>

export default ImmersiveHeadline;
