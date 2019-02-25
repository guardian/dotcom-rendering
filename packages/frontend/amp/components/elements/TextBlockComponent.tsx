import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '@frontend/lib/pillars';
import { body, headline } from '@guardian/pasteup/typography';

// tslint:disable:react-no-dangerous-html
const style = (pillar: Pillar) => css`
    strong {
        font-weight: 700;
    }
    h2 {
        margin-top: 24px;
        margin-bottom: 10px;
        ${headline(3)};
    }
    p {
        padding: 0 0 12px;
        ${body(2)};
        font-weight: 300;
        word-wrap: break-word;
        color: ${palette.neutral[7]};
    }
    a {
        color: ${pillarPalette[pillar].dark};
        text-decoration: none;
        border-bottom: 1px solid #dcdcdc;
        :hover {
            border-bottom: 1px solid ${pillarPalette[pillar].dark};
        }
    }
    ${body(3)};
`;

const immersiveBodyStyle = css`
    h2 {
        ${headline(7)};
        font-weight: 200;
    }
`;

export const TextBlockComponent: React.FC<{
    html: string;
    pillar: Pillar;
    isImmersive: boolean;
}> = ({ html, pillar, isImmersive }) => (
    <span
        className={cx(style(pillar), { [immersiveBodyStyle]: isImmersive })}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
