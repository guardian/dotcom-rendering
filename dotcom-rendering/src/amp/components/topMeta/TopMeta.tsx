import React from 'react';

import { ArticleDesign, ArticleSpecial } from '@guardian/libs';

import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { TopMetaNews } from '@root/src/amp/components/topMeta/TopMetaNews';
import { TopMetaOpinion } from '@root/src/amp/components/topMeta/TopMetaOpinion';
import { TopMetaPaidContent } from '@root/src/amp/components/topMeta/TopMetaPaidContent';
import { TopMetaAnalysis } from '@root/src/amp/components/topMeta/TopMetaAnalysis';

export const TopMeta: React.FunctionComponent<{
	data: ArticleModel;
	design: ArticleDesign;
	pillar: ArticleTheme;
	adTargetingBuilder?: AdTargetingBuilder;
}> = ({ data, design, pillar, adTargetingBuilder }) => {
	if (pillar === ArticleSpecial.Labs)
		return <TopMetaPaidContent articleData={data} pillar={pillar} />;
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
			return <TopMetaOpinion articleData={data} pillar={pillar} />;
		case ArticleDesign.Analysis:
			return <TopMetaAnalysis articleData={data} pillar={pillar} />;
		default:
			return (
				<TopMetaNews
					articleData={data}
					adTargetingBuilder={adTargetingBuilder}
					pillar={pillar}
				/>
			);
	}
};
