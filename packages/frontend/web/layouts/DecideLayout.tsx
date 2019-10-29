import React from 'react';
import { designTypeDefault } from '@frontend/lib/designTypes';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';

import { hasShowcase } from './layoutHelpers';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    config: ConfigType;
    NAV: NavType;
};

export const DecideLayout = ({ designType, CAPI, config, NAV }: Props) => {
    if (hasShowcase(CAPI.mainMediaElements)) {
        return <ShowcaseLayout CAPI={CAPI} config={config} NAV={NAV} />;
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} config={config} NAV={NAV} />,
    );

    return designTypeContent[designType];
};
