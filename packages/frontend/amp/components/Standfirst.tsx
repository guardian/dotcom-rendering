import React from 'react';
import { headline, textSans } from '@guardian/pasteup/typography';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette, pillarMap } from '@frontend/lib/pillars';

// listStyles are used in paid content standfirsts, with a fallback for normal pillars
const listStyles = (pillar: Pillar) => css`
    li {
        margin-bottom: 6px;
        padding-left: 20px;
        ${pillar === 'labs' ? textSans(7) : headline(2)};
        ${pillar === 'labs' && 'font-weight: 700;'}
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
        background-color: ${pillar === 'labs'
            ? palette.neutral[60]
            : palette.neutral[86]};
        margin-left: -20px;
    }
`;

const standfirstCss = pillarMap(
    pillar => css`
        ${pillar === 'labs' ? textSans(7) : headline(2)};
        font-weight: 100;
        color: ${palette.neutral[7]};
        margin-bottom: 12px;
        ${listStyles(pillar)};
        p {
            margin-bottom: 8px;
            ${pillar === 'labs' ? 'font-weight: 700;' : 'font-weight: 200;'}
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
                color: ${pillar === 'labs'
                    ? pillarPalette[pillar].main
                    : pillarPalette[pillar].dark};
                text-decoration: none;
                border-bottom: 1px solid
                    ${pillar === 'labs'
                        ? palette.neutral[60]
                        : palette.neutral[86]};
            }
            a:hover {
                border-bottom: 1px solid
                    ${pillar === 'labs'
                        ? palette.neutral[7]
                        : palette.neutral[86]};
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
