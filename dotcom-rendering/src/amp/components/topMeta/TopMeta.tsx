import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleModel } from '../../types/ArticleModel';
import { TopMetaAnalysis } from './TopMetaAnalysis';
import { TopMetaNews } from './TopMetaNews';
import { TopMetaOpinion } from './TopMetaOpinion';
import { TopMetaPaidContent } from './TopMetaPaidContent';

type Props = {
	data: ArticleModel;
	design: ArticleDesign;
	pillar: ArticleTheme;
	adTargeting?: AdTargeting;
};
export const TopMeta = ({ data, design, pillar, adTargeting }: Props) => {
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
					adTargeting={adTargeting}
					pillar={pillar}
				/>
			);
	}
};
