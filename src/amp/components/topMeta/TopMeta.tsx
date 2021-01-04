import React from 'react';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { TopMetaNews } from '@root/src/amp/components/topMeta/TopMetaNews';
import { TopMetaOpinion } from '@root/src/amp/components/topMeta/TopMetaOpinion';
import { TopMetaPaidContent } from '@root/src/amp/components/topMeta/TopMetaPaidContent';
import { designTypeDefault } from '@root/src/lib/designTypes';

export const TopMeta: React.SFC<{
	data: ArticleModel;
	designType: DesignType;
	pillar: CAPIPillar;
	adTargeting?: AdTargeting;
}> = ({ data, designType, pillar, adTargeting }) => {
	// Note, liveblogs have a separate top meta - see TopMetaLiveblog
	const defaultTopMeta: DesignTypesObj = designTypeDefault(
		<TopMetaNews
			articleData={data}
			adTargeting={adTargeting}
			pillar={pillar}
		/>,
	);

	// Extend defaultTopMeta with custom topMeta for some designTypes
	const designTypeTopMeta: DesignTypesObj = {
		...defaultTopMeta,
		Comment: <TopMetaOpinion articleData={data} pillar={pillar} />,
		AdvertisementFeature: (
			<TopMetaPaidContent articleData={data} pillar={pillar} />
		),
	};

	return designTypeTopMeta[designType];
};
