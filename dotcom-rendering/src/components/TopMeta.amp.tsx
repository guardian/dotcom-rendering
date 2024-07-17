import {
	ArticleDesign,
	ArticleSpecial,
	type ArticleTheme,
} from '@guardian/libs';
import type { AMPArticleModel } from '../types/article.amp';
import { TopMetaAnalysis } from './TopMetaAnalysis.amp';
import { TopMetaNews } from './TopMetaNews.amp';
import { TopMetaOpinion } from './TopMetaOpinion.amp';
import { TopMetaPaidContent } from './TopMetaPaidContent.amp';

type Props = {
	data: AMPArticleModel;
	design: ArticleDesign;
	pillar: ArticleTheme;
	adTargeting?: AdTargeting;
};
export const TopMeta = ({ data, design, pillar, adTargeting }: Props) => {
	if (pillar === ArticleSpecial.Labs) {
		return <TopMetaPaidContent articleData={data} pillar={pillar} />;
	}
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
