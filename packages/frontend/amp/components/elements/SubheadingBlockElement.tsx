import React from 'react';
import { css, cx } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { pillarPalette } from '@frontend/lib/pillars';

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
        border-bottom: 1px solid #dcdcdc;
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

export const SubheadingBlockComponent: React.FC<{
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
