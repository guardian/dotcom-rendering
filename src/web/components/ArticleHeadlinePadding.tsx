import React from 'react';
import { css, cx } from 'emotion';

import { from } from '@guardian/src-foundations/mq';

const paddingTop = css`
    padding-top: 3px;
`;

const standardPadding = css`
    padding-bottom: 24px;
    ${from.tablet} {
        padding-bottom: 36px;
    }
`;

const determinPadding = (designType: DesignType) => {
    switch (designType) {
        case 'Article':
        case 'Media':
        case 'PhotoEssay':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Feature':
        case 'Comment':
        case 'Analysis':
            return standardPadding;

        case 'Review':
        case 'Interview':
            return null;
    }
};

export const ArticleHeadlinePadding: React.FC<{
    children: React.ReactNode;
    designType: DesignType;
}> = ({ children, designType }) => {
    const paddingClassName = determinPadding(designType);
    return (
        <div className={cx(paddingTop, paddingClassName || '')}>{children}</div>
    );
};
