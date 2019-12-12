import React from 'react';
import { basePx, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import { until } from '@guardian/src-foundations/mq';

const HeadlineStyles = css`
    padding: ${basePx(0, 0, 4, 0)};
    
    ${until.wide} {
        padding: ${basePx(0, 1, 4, 1)};
    }

    ${headlineFont}

    h1 {
        font-weight: 300;
        ${headlineFontStyles}
        color: ${palette.neutral[7]};
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

interface OpinionHeadlineProps {
    headline: string;
}

const OpinionHeadline = ({
    headline
}: OpinionHeadlineProps): JSX.Element =>
    <div css={[HeadlineStyles, HeadlineDarkStyles]}>
        <h1>{headline}</h1>
    </div>

export default OpinionHeadline;
