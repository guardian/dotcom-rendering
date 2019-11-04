import React from 'react';
import { css, cx } from 'emotion';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { headline, textSans, body, palette } from '@guardian/src-foundations';

const standfirstStyles = css`
    ${body({ level: 2 })};
    max-width: 550px;
    font-weight: 700;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;

    li {
        ${textSans({ level: 3 })};
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
        background-color: ${palette.neutral[86]};
        margin-left: -20px;
    }

    p {
        margin-bottom: 8px;
    }

    li {
        ${headline({ level: 1 })};
    }
`;

const standfirstLinks = pillarMap(
    pillar =>
        css`
            a {
                color: ${pillarPalette[pillar].dark};
                text-decoration: none;
                border-bottom: 1px solid ${palette.neutral[86]};
                transition: border-color 0.15s ease-out;
            }
        `,
);

type Props = {
    pillar: Pillar;
    standfirst: string;
};

export const ArticleStandfirst = ({ pillar, standfirst }: Props) => (
    <div // tslint:disable-line:react-no-dangerous-html
        className={cx(standfirstStyles, standfirstLinks[pillar])}
        dangerouslySetInnerHTML={{
            __html: standfirst,
        }}
    />
);
