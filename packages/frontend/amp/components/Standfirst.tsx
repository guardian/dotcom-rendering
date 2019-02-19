import React from 'react';
import { headline } from '@guardian/pasteup/typography';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette, pillarMap } from '@frontend/lib/pillars';

// TODO - unclear if we need the list styles as well here
const listStyles = (pillar: Pillar) => css`
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

const standfirstCss = pillarMap(
    pillar => css`
        ${headline(2)};
        font-weight: 100;
        color: ${palette.neutral[7]};
        margin-bottom: 12px;
        ${listStyles(pillar)};
        p {
            margin-bottom: 8px;
            font-weight: 200;
        }
        strong {
            font-weight: 700;
        }
    `,
);

const standfirstLinks = pillarMap(
    pillar =>
        css`
            a {
                color: ${pillarPalette[pillar].dark};
                text-decoration: none;
                border-bottom: 1px solid ${palette.neutral[86]};
            }
        `,
);

export const Standfirst: React.SFC<{
    text: string;
    pillar: Pillar;
}> = ({ text, pillar }) => (
    <div // tslint:disable-line:react-no-dangerous-html
        className={cx(standfirstCss[pillar], standfirstLinks[pillar])}
        dangerouslySetInnerHTML={{
            __html: text,
        }}
    />
);
