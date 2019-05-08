import React from 'react';
import { headline, textSans } from '@guardian/pasteup/typography';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette, pillarMap } from '@frontend/lib/pillars';
import { composeLabsCSS } from '@frontend/amp/lib/compose-labs-css';

// listStyles are used in paid content standfirsts, with a fallback for normal pillars
const listStyle = css`
    li {
        margin-bottom: 6px;
        padding-left: 20px;
        ${headline(2)};
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
        background-color: ${palette.neutral[86]};
        margin-left: -20px;
    }
`;

const standfirstCss = css`
    ${headline(2)};
    font-weight: 100;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;
    margin-bottom: 12px;
    ${listStyle};
    p {
        margin-bottom: 8px;
        font-weight: 200;
    }
    strong {
        font-weight: 700;
    }
`;

const standfirstLinks = pillarMap(
    pillar =>
        css`
            a {
                color: ${pillarPalette[pillar].dark};
                text-decoration: none;
                border-bottom: 1px solid ${palette.neutral[86]};
            }
            a:hover {
                border-bottom: 1px solid ${palette.neutral[86]};
            }
        `,
);

// Labs paid content only
const labsStyle = (pillar: Pillar) => css`
    p,
    li {
        font-weight: 700;
        ${textSans(8)}
    }
    li:before {
        background-color: ${palette.neutral[60]};
    }
    a {
        border-bottom: 1px solid ${palette.neutral[60]};
    }
    a:hover {
        border-bottom: 1px solid ${pillarPalette[pillar].dark};
    }
`;

export const Standfirst: React.SFC<{
    text: string;
    pillar: Pillar;
}> = ({ text, pillar }) => {
    return (
        <div // tslint:disable-line:react-no-dangerous-html
            className={composeLabsCSS(
                pillar,
                cx(standfirstCss, standfirstLinks[pillar]),
                labsStyle(pillar),
            )}
            dangerouslySetInnerHTML={{
                __html: text,
            }}
        />
    );
};
