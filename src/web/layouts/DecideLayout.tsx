import React from 'react';
import { designTypeDefault } from '@root/src/lib/designTypes';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';

type Props = {
    CAPI: CAPIType;
    NAV: NavType;
    dcr: dcrType;
};

export const DecideLayout = ({ CAPI, NAV, dcr }: Props) => {
    if (CAPI.pageType.hasShowcaseMainElement) {
        return <ShowcaseLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />,
    );

    designTypeContent.Comment = (
        <CommentLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />
    );

    return designTypeContent[CAPI.designType];
};
