import React from 'react';
import { designTypeDefault } from '@root/src/lib/designTypes';
import loadable from '@loadable/component';

import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';

const StandardLayout = loadable(() => import('./StandardLayout'));

type Props = {
    CAPI: CAPIType;
    NAV: NavType;
};

export const DecideLayout = ({ CAPI, NAV }: Props) => {
    if (CAPI.pageType.hasShowcaseMainElement) {
        return <ShowcaseLayout CAPI={CAPI} NAV={NAV} />;
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} NAV={NAV} />,
    );

    designTypeContent.Comment = <CommentLayout CAPI={CAPI} NAV={NAV} />;

    return designTypeContent[CAPI.designType];
};
