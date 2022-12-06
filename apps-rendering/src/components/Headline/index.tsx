import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { WithAgeWarning } from 'components/WithAgeWarning';
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
		return (
			<WithAgeWarning
				tags={item.tags}
				publishDate={item.publishDate}
				format={getFormat(item)}
			>
				<ImmersiveHeadline headline={item.headline} format={format} />
			</WithAgeWarning>
		);
	}

	if (format.theme === ArticleSpecial.Labs) {
		return (
			<WithAgeWarning
				tags={item.tags}
				publishDate={item.publishDate}
				format={getFormat(item)}
			>
				<LabsHeadline item={item} />
			</WithAgeWarning>
		);
	}

	switch (format.design) {
		case ArticleDesign.Feature:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<FeatureHeadline item={item} />
				</WithAgeWarning>
			);
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<CommentHeadline item={item} />
				</WithAgeWarning>
			);

		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<MediaHeadline item={item} />
				</WithAgeWarning>
			);
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<BlogHeadline item={item} />
				</WithAgeWarning>
			);
		case ArticleDesign.Interview:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<InterviewHeadline item={item} />
				</WithAgeWarning>
			);
		case ArticleDesign.Review:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<ReviewHeadline item={item} />
				</WithAgeWarning>
			);
		case ArticleDesign.Gallery:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<GalleryHeadline headline={item.headline} format={format} />
				</WithAgeWarning>
			);
		default:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={getFormat(item)}
				>
					<DefaultHeadline
						item={item}
						styles={css(defaultStyles(item))}
					/>
				</WithAgeWarning>
			);
	}
};

export default Headline;
