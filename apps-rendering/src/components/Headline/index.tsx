import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { Item } from 'item';
import { getFormat } from 'item';
import BlogHeadline from './BlogHeadline';
import CommentHeadline from './CommentHeadline';
import FeatureHeadline from './FeatureHeadline';
import GalleryHeadline from './GalleryHeadline';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';
import ImmersiveHeadline from './ImmersiveHeadline';
import InterviewHeadline from './InterviewHeadline';
import LabsHeadline from './LabsHeadline';
import MediaHeadline from './MediaHeadline';
import ReviewHeadline from './ReviewHeadline';

interface Props {
	item: Item;
}

const Headline: React.FC<Props> = ({ item }) => {
	const format = getFormat(item);

	if (format.display === ArticleDisplay.Immersive) {
		return <ImmersiveHeadline headline={item.headline} format={format} />;
	}

	if (format.theme === ArticleSpecial.Labs) {
		return <LabsHeadline item={item} />;
	}

	switch (format.design) {
		case ArticleDesign.Feature:
			return <FeatureHeadline item={item} />;

		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return <CommentHeadline item={item} />;

		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return <MediaHeadline item={item} />;

		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return <BlogHeadline item={item} />;

		case ArticleDesign.Interview:
			return <InterviewHeadline item={item} />;

		case ArticleDesign.Review:
			return <ReviewHeadline item={item} />;

		case ArticleDesign.Gallery:
			return <GalleryHeadline headline={item.headline} format={format} />;

		default:
			return (
				<DefaultHeadline
					item={item}
					styles={css(defaultStyles(item))}
				/>
			);
	}
};

export default Headline;
