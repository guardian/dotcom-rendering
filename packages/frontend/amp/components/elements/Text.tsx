import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '@frontend/lib/pillars';
import { body } from '@guardian/pasteup/typography';
import { sanitise } from '@frontend/amp/lib/sanitise-html';

// Note, this should only apply basic text styling. It is a case where we want
// to re-use styling, but generally we should avoid this as it couples
// components. Longer term we should probably put this in GUUI or somewhere else
// which is easy to discover and re-use.

// tslint:disable:react-no-dangerous-html
export const TextStyle = (pillar: Pillar) => css`
    strong {
        font-weight: 700;
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

export const Text: React.FC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    <span
        className={TextStyle(pillar)}
        dangerouslySetInnerHTML={{
            __html: sanitise(html),
        }}
    />
);
