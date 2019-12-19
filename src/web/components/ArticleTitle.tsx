import React from 'react';
import { css, cx } from 'emotion';

import { until } from '@guardian/src-foundations/mq';
import { Badge } from '@frontend/web/components/Badge';

import { SeriesSectionLink } from './SeriesSectionLink';

const articleTitleStyles = css`
    padding-top: 8px;
    padding-right: 10px;
    max-width: 229px;

    display: flex;
    flex-direction: row;
    order: 1;
    flex-basis: 229px;
    flex-grow: 0;
    flex-shrink: 0;

    ${until.wide} {
        max-width: 150px;
        flex-basis: 150px;
        flex-direction: column;
    }

    ${until.leftCol} {
        padding-right: 0;
        max-width: 100%;
        flex-basis: 100%;
        border-right: 0;
    }

    ${until.phablet} {
        padding-top: 0;
        padding-left: 10px;
    }
`;

type Props = {
    CAPI: CAPIType;
    badge?: BadgeType;
    inLeftCol?: boolean;
    fallbackToSection?: boolean;
};

const titleBadgeWrapper = css`
    margin-bottom: 6px;
    margin-top: 6px;
    ${until.leftCol} {
        display: flex;
        margin-right: 10px;
    }
`;

const badgeContainer = css`
    display: flex;
    padding-top: 3px;
    padding-bottom: 6px;
`;

const marginTop = css`
    margin-top: 6px;
`;

export const ArticleTitle = ({
    CAPI,
    badge,
    fallbackToSection = true,
}: Props) => (
    <div className={cx(articleTitleStyles, badge && badgeContainer)}>
        {badge && (
            <div className={titleBadgeWrapper}>
                <Badge svgSrc={badge.svgSrc} linkTo={badge.linkTo} />
            </div>
        )}
        <div className={badge && marginTop}>
            <SeriesSectionLink
                CAPI={CAPI}
                fallbackToSection={fallbackToSection}
            />
        </div>
    </div>
);
