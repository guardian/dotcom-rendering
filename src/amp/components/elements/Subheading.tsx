import React from 'react';
import { css, cx } from 'emotion';
import { palette, headline, textSans } from '@guardian/src-foundations';
import { pillarPalette } from '@root/src/lib/pillars';
import { composeLabsCSS } from '@root/src/amp/lib/compose-labs-css';

// tslint:disable:react-no-dangerous-html
const style = (pillar: Pillar) => css`
    h2 {
        margin-top: 24px;
        margin-bottom: 10px;
        ${headline({ level: 2 })};
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
        ${headline({ level: 5 })};
        font-weight: 200;
    }
`;

// Labs paid content only
const subHeadingStyleLabs = css`
    h2 {
        font-weight: 700;
        ${textSans({ level: 4 })}
    }
`;

export const Subheading: React.FC<{
    html: string;
    pillar: Pillar;
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
