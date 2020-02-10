import React from 'react';
import { designTypeDefault } from '@root/src/lib/designTypes';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    NAV: NavType;
};

export const DecideLayout = ({ designType, CAPI, NAV }: Props) => {
    if (CAPI.pageType.hasShowcaseMainElement) {
        return <ShowcaseLayout CAPI={CAPI} NAV={NAV} />;
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} NAV={NAV} />,
    );

    designTypeContent.Comment = <CommentLayout CAPI={CAPI} NAV={NAV} />;

    return designTypeContent[designType];
};
