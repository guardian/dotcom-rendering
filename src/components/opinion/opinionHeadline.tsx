import React from 'react';
import { basePx, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import { PillarStyles } from 'pillar';
import { until } from '@guardian/src-foundations/mq';
import { componentFromHtml } from 'renderBlocks';

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
    byline: string;
    headline: string;
    pillarStyles: PillarStyles;
}

const OpinionHeadline = ({
    byline,
    headline
}: OpinionHeadlineProps): JSX.Element =>
    <div css={[HeadlineStyles, HeadlineDarkStyles]}>
        <h1>{headline}</h1>
        <address>{componentFromHtml(byline)}</address>
    </div>

export default OpinionHeadline;
