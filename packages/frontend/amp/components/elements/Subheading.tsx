import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { headline, textSans } from '@guardian/pasteup/typography';
import { pillarPalette } from '@frontend/lib/pillars';
import { composeLabsCSS } from '@root/packages/frontend/amp/lib/compose-labs-css';

// tslint:disable:react-no-dangerous-html
const style = (pillar: Pillar) => css`
    h2 {
        margin-top: 24px;
        margin-bottom: 10px;
        ${headline(3)};
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
        ${headline(7)};
        font-weight: 200;
    }
`;

// Labs paid content only
const subHeadingStyleLabs = css`
    h2 {
        font-weight: 700;
        ${textSans(7)}
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
