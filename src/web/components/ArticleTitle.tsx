import React from 'react';
import { css, cx } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { SeriesSectionLink } from './SeriesSectionLink';

const sectionStyles = css`
    height: 157px;
    padding-top: 8px;
    display: flex;
    flex-direction: row;
    ${from.leftCol} {
        flex-direction: column;
    }
`;

type Props = {
    CAPI: CAPIType;
    badge?: BadgeType;
    inLeftCol?: boolean;
    fallbackToSection?: boolean;
};

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
    inLeftCol,
    fallbackToSection = true,
}: Props) => (
    <div className={cx(inLeftCol && sectionStyles, badge && badgeContainer)}>
        <div className={badge && marginTop}>
            <SeriesSectionLink
                CAPI={CAPI}
                fallbackToSection={fallbackToSection}
            />
        </div>
    </div>
);
