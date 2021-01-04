import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';
import { composeLabsCSS } from '@root/src/amp/lib/compose-labs-css';

const style = (pillar: CAPIPillar) => css`
    h2 {
        margin-top: 24px;
        margin-bottom: 10px;
        ${headline.xxsmall()};
    }
    strong {
        font-weight: 700;
    }
    a {
        color: ${pillarPalette[pillar].dark};
        text-decoration: none;
        border-bottom: 1px solid ${palette.neutral[86]};
        :hover {
            border-bottom: 1px solid ${pillarPalette[pillar].dark};
        }
    }
`;

const immersiveBodyStyle = css`
    h2 {
        ${headline.medium()};
        font-weight: 200;
    }
`;

// Labs paid content only
const subHeadingStyleLabs = css`
    h2 {
        font-weight: 700;
        ${textSans.large()}
    }
`;

export const SubheadingBlockComponent: React.FC<{
    html: string;
    pillar: CAPIPillar;
    isImmersive: boolean;
}> = ({ html, pillar, isImmersive }) => (
    <span
        className={composeLabsCSS(
            pillar,
            cx(style(pillar), { [immersiveBodyStyle]: isImmersive }),
            subHeadingStyleLabs,
        )}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
