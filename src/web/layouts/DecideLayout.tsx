import React from 'react';
import { designTypeDefault } from '@root/src/lib/designTypes';

import { StandardLayout } from './StandardLayouts/StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout/ShowcaseLayout';

import { hasShowcase } from './layoutHelpers';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    NAV: NavType;
};

export const DecideLayout = ({ designType, CAPI, NAV }: Props) => {
    if (hasShowcase(CAPI.mainMediaElements)) {
        return <ShowcaseLayout CAPI={CAPI} NAV={NAV} />;
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} NAV={NAV} />,
    );

    return designTypeContent[designType];
};
