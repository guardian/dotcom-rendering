import React from 'react';

import { DecideLayout } from '../layouts/DecideLayout';

export const Article: React.FC<{
    data: ArticleProps;
}> = ({ data }) => {
    return (
        <DecideLayout
            designType={data.CAPI.designType}
            CAPI={data.CAPI}
            config={data.config}
            NAV={data.NAV}
        />
    );
};
