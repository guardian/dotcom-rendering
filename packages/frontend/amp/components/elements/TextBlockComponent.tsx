import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '@frontend/lib/pillars';
import { textSans, body } from '@guardian/pasteup/typography';

// tslint:disable:react-no-dangerous-html
const style = (pillar: Pillar) => css`
    strong {
        font-weight: 700;
    }
    h2 {
        margin-top: 24px;
        ${textSans(6)};
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
    ${textSans(5)};
`;
export const TextBlockComponent: React.FC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    <span
        className={style(pillar)}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
