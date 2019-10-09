import React from 'react';
import { Article } from '../pages/Article';
import { Interview } from '../pages/Interview';
import { designTypeDefault } from '@frontend/lib/designTypes';

type Props = {
    designType: DesignType;
    data: { CAPI: CAPIType; NAV: NavType; config: ConfigType };
};

export const DecidePage = ({ designType, data }: Props) => {
    const designTypePage: DesignTypesObj = designTypeDefault(
        <Article data={data} />,
    );

    designTypePage.Interview = <Interview data={data} />;

    return designTypePage[designType];
};
