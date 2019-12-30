import React from 'react';
import { css, cx } from 'emotion';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

import { Standfirst } from '@frontend/web/components/Standfirst';

const standfirstStyles = css`
    padding-bottom: 12px;
    padding-left: 10px;
    position: relative;
    left: 229px;

    order: 4;
    flex-basis: 100%;

    border-left: 1px solid ${palette.neutral[86]};

    ${until.wide} {
        left: 150px;
    }

    ${until.leftCol} {
        left: 0;
        padding-left: 0;

        border-left: 0;
    }

    ${until.phablet} {
        padding-left: 10px;
        padding-right: 10px;
    }

    > div {
        max-width: 550px;
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

const showcaseLayout = css`
    order: 5;
    flex-basis: 620px;

    border-left: 1px solid ${palette.neutral[86]};

    ${until.wide} {
        left: 150px;
    }

    ${until.leftCol} {
        order: 3;
        left: 0;
        border-left: 0;
        padding-left: 0;
    }

    ${until.phablet} {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

type Props = {
    designType?: DesignType;
    pillar: Pillar;
    standfirst: string; // Can be html
    layoutType?: LayoutType;
};

export const ArticleStandfirst = ({
    designType = 'Article',
    pillar,
    standfirst,
    layoutType = 'Standard',
}: Props) => (
    <div
        className={cx(
            standfirstStyles,
            standfirstLinks[pillar],
            layoutType === 'Showcase' && showcaseLayout,
        )}
    >
        <Standfirst designType={designType} standfirst={standfirst} />
    </div>
);
