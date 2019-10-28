import React from 'react';
import { Content } from '@frontend/web/components/Content';
import { designTypeDefault } from '@frontend/lib/designTypes';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    config: ConfigType;
};

export const DecideLayout = ({ designType, CAPI, config }: Props) => {
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <Content CAPI={CAPI} config={config} />,
    );

    designTypeContent.Interview = <Content CAPI={CAPI} config={config} />;

    return designTypeContent[designType];
};
