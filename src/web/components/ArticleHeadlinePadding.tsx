import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';

const standardPadding = css`
    padding-bottom: 24px;
    padding-top: 3px;
    ${from.tablet} {
        padding-bottom: 36px;
    }
`;

const determinPadding = (designType: DesignType) => {
    switch (designType) {
        case 'Article':
        case 'Media':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Review':
        case 'Feature':
        case 'Comment':
        case 'Analysis':
            return standardPadding;
        case 'Interview':
        case 'Immersive':
            return null;
    }
};

export const ArticleHeadlinePadding: React.FC<{
    children: React.ReactNode;
    designType: DesignType;
}> = ({ children, designType }) => {
    const paddingClassName = determinPadding(designType);
    return <div className={paddingClassName || ''}>{children}</div>;
};
