import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { AMPArticleModel } from '../types/article.amp';
import { TopMetaAnalysis } from './TopMetaAnalysis.amp.tsx';
import { TopMetaNews } from './TopMetaNews.amp.tsx';
import { TopMetaOpinion } from './TopMetaOpinion.amp.tsx';
import { TopMetaPaidContent } from './TopMetaPaidContent.amp.tsx';

type Props = {
	data: AMPArticleModel;
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
