import React from 'react';
import { ArticleModel } from '@frontend/amp/types/ArticleModel';
import { TopMetaNews } from '@frontend/amp/components/topMeta/TopMetaNews';
import { TopMetaOpinion } from '@frontend/amp/components/topMeta/TopMetaOpinion';
import { TopMetaPaidContent } from '@frontend/amp/components/topMeta/TopMetaPaidContent';
import { designTypeDefault } from '@frontend/lib/designTypes';

export const TopMeta: React.SFC<{
    data: ArticleModel;
    designType: DesignType;
    pillar: Pillar;
    adTargeting?: AdTargeting;
}> = ({ data, designType, pillar, adTargeting }) => {
    // Note, liveblogs have a separate top meta - see TopMetaLiveblog
    const defaultTopMeta: DesignTypesObj = designTypeDefault(
        <TopMetaNews articleData={data} adTargeting={adTargeting} />,
    );

    // Extend defaultTopMeta with custom topMeta for some designTypes
    const designTypeTopMeta: DesignTypesObj = {
        ...defaultTopMeta,
        Comment: <TopMetaOpinion articleData={data} pillar={pillar} />,
        AdvertisementFeature: <TopMetaPaidContent articleData={data} />,
    };

    return designTypeTopMeta[designType];
};
