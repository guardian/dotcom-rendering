import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '@frontend/lib/pillars';
import { sanitise } from '@frontend/amp/lib/sanitise-html';
import { body, textSans } from '@guardian/pasteup/typography';
import { composeLabsCSS } from '@root/packages/frontend/amp/lib/compose-labs-css';

// Note, this should only apply basic text styling. It is a case where we want
// to re-use styling, but generally we should avoid this as it couples
// components. Longer term we should probably put this in GUUI or somewhere else
// which is easy to discover and re-use.

// tslint:disable:react-no-dangerous-html

export const ListStyle = (iconColour: string) => css`
    li {
        margin-bottom: 6px;
        padding-left: 20px;
        p {
            display: inline;
        }
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 8px;
        background-color: ${iconColour};
        margin-left: -20px;
    }
`;

export const LinkStyle = (pillar: Pillar) => css`
    a {
        color: ${pillarPalette[pillar].dark};
        text-decoration: none;
        border-bottom: 1px solid ${pillarPalette[pillar].neutral.border};
        :hover {
            border-bottom: 1px solid ${pillarPalette[pillar].dark};
        }
    }
`;

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

    blockquote {
        margin-left: 20px;
        font-style: italic;
    }

    ${body(2)};

    ${LinkStyle(pillar)};
    ${ListStyle(pillarPalette[pillar].neutral.border)};
`;

// Labs paid content only
const textStyleLabs = css`
    p {
        ${textSans(7)}
    }
`;

export const Text: React.FC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    <span
        className={composeLabsCSS(pillar, TextStyle(pillar), textStyleLabs)}
        dangerouslySetInnerHTML={{
            __html: sanitise(html),
        }}
    />
);
