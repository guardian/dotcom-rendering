import React from 'react';
import { css, cx } from 'emotion';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';

import { Standfirst } from '@frontend/web/components/Standfirst';

const standfirstStyles = css`
    max-width: 550px;
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
    designType?: DesignType;
    pillar: Pillar;
    standfirst: string; // Can be html
};

export const ArticleStandfirst = ({
    designType = 'Article',
    pillar,
    standfirst,
}: Props) => (
    <div className={cx(standfirstStyles, standfirstLinks[pillar])}>
        <Standfirst designType={designType} standfirst={standfirst} />
    </div>
);
