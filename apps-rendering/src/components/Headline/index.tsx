import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { Item } from 'item';
import AnalysisHeadline from './AnalysisHeadline';
import BlogHeadline from './BlogHeadline';
import CommentHeadline from './CommentHeadline';
import FeatureHeadline from './FeatureHeadline';
import {
	DefaultHeadline,
	defaultStyles,
	fontSizeRestriction,
} from './Headline.defaults';
import ImmersiveHeadline from './ImmersiveHeadline';
import LabsHeadline from './LabsHeadline';
import MediaHeadline from './MediaHeadline';
import InterviewHeadline from './InterviewHeadline';

interface Props {
	item: Item;
}

const Headline: React.FC<Props> = ({ item }) => {
	if (item.display === ArticleDisplay.Immersive) {
		return <ImmersiveHeadline item={item} />;
	}

	if (item.theme === ArticleSpecial.Labs) {
		return <LabsHeadline item={item} />;
	}

	switch (item.design) {
		case ArticleDesign.Analysis:
			return <AnalysisHeadline item={item} />;
		case ArticleDesign.Feature:
			return <FeatureHeadline item={item} />;
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return <CommentHeadline item={item} />;
		case ArticleDesign.Media:
			return <MediaHeadline item={item} />;
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return <BlogHeadline item={item} />;
		case ArticleDesign.Interview:
			return <InterviewHeadline item={item} />;
		default:
			return (
				<DefaultHeadline
					item={item}
					styles={css(defaultStyles(item), fontSizeRestriction)}
				/>
			);
	}
};

export default Headline;
