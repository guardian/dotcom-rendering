import React from 'react';
import { css, cx } from 'emotion';

import { from, until } from '@guardian/src-foundations/mq';
import { Badge } from '@frontend/web/components/Badge';
import { Display } from '@guardian/types/Format';
import { SeriesSectionLink } from './SeriesSectionLink';

type Props = {
    display: Display;
    designType: DesignType;
    tags: TagType[];
    sectionLabel: string;
    sectionUrl: string;
    guardianBaseURL: string;
    pillar: CAPIPillar;
    badge?: BadgeType;
};

const sectionStyles = css`
    padding-top: 8px;
    display: flex;
    flex-direction: row;
    ${from.leftCol} {
        flex-direction: column;
    }
`;

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

const immersiveMargins = css`
    max-width: 400px;
    margin-bottom: 4px;
    /*
        Make sure we vertically align the title font with the body font
    */
    ${from.tablet} {
        margin-left: 16px;
    }
    ${from.leftCol} {
        margin-left: 25px;
    }
`;

export const ArticleTitle = ({
    display,
    designType,
    tags,
    sectionLabel,
    sectionUrl,
    guardianBaseURL,
    pillar,
    badge,
}: Props) => (
    <div className={cx(sectionStyles, badge && badgeContainer)}>
        {badge && display !== Display.Immersive && (
            <div className={titleBadgeWrapper}>
                <Badge imageUrl={badge.imageUrl} seriesTag={badge.seriesTag} />
            </div>
        )}
        <div
            className={cx(
                badge && marginTop,
                display === Display.Immersive && immersiveMargins,
            )}
        >
            <SeriesSectionLink
                display={display}
                designType={designType}
                tags={tags}
                sectionLabel={sectionLabel}
                sectionUrl={sectionUrl}
                guardianBaseURL={guardianBaseURL}
                pillar={pillar}
                badge={badge}
            />
        </div>
    </div>
);
