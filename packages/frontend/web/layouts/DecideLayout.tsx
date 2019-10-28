import React from 'react';
import { designTypeDefault } from '@frontend/lib/designTypes';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';

import { hasShowcase } from './layoutHelpers';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    config: ConfigType;
};

export const DecideLayout = ({ designType, CAPI, config }: Props) => {
    if (hasShowcase(CAPI.mainMediaElements)) {
        return <ShowcaseLayout CAPI={CAPI} config={config} />;
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} config={config} />,
    );

    return designTypeContent[designType];
};
