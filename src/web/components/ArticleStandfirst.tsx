import React from 'react';
import { css, cx } from 'emotion';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

import { Standfirst } from '@frontend/web/components/Standfirst';

const standfirstStyles = css`
    ${headline.tiny({
        fontWeight: 'bold',
    })};
    line-height: 20px;
    max-width: 550px;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;
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
    standfirst: string; // Can be html
};

export const ArticleStandfirst = ({ pillar, standfirst }: Props) => (
    <div className={cx(standfirstStyles, standfirstLinks[pillar])}>
        <Standfirst pillar={pillar} standfirst={standfirst} />
    </div>
);
