import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { brandAlt, remSpace, textSans } from '@guardian/source-foundations';
import { Hide, SvgNewsletter } from '@guardian/source-react-components';
import { fromNullable, OptionKind } from '@guardian/types';
import DesignTag from 'components/DesignTag';
import Series from 'components/Series';
import { WithAgeWarning } from 'components/WithAgeWarning';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
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

const seriesStyles = css`
	padding-bottom: ${remSpace[1]};
`;

const detailBlockStyles = css`
	display: flex;
	align-items: center;
	margin-bottom: ${remSpace[2]};

	svg {
		background-color: ${brandAlt[400]};
		border-radius: 50%;
		margin-right: ${remSpace[2]};
		width: ${remSpace[6]};
		padding: 0.125rem;
	}

	b {
		${textSans.xsmall({ fontWeight: 'bold' })}
	}
`;

const Headline: React.FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const designTag = <DesignTag format={format} />;

	if (format.display === ArticleDisplay.Immersive) {
		return (
			<WithAgeWarning
				tags={item.tags}
				publishDate={item.publishDate}
				format={format}
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
				format={format}
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
					format={format}
				>
					<Series item={item} />
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
					format={format}
				>
					<Series item={item} />
					{designTag}
					<CommentHeadline item={item} />
				</WithAgeWarning>
			);

		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={format}
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
					format={format}
				>
					<Hide from="desktop">
						<div css={seriesStyles}>
							<Series item={item} />
						</div>
					</Hide>
					<BlogHeadline item={item} />
				</WithAgeWarning>
			);
		case ArticleDesign.Interview: {
			const interviewToneTag = fromNullable(
				item.tags.find((tag) => tag.id === 'tone/interview'),
			);
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={format}
				>
					<Series item={item} />
					{interviewToneTag.kind === OptionKind.Some ? (
						<nav>
							<a href={interviewToneTag.value.webUrl}>
								{designTag}
							</a>
						</nav>
					) : (
						designTag
					)}
					<InterviewHeadline item={item} />
				</WithAgeWarning>
			);
		}

		case ArticleDesign.Review:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={format}
				>
					<Series item={item} />
					<ReviewHeadline item={item} />
				</WithAgeWarning>
			);
		case ArticleDesign.Gallery:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={format}
				>
					<Series item={item} />
					<GalleryHeadline headline={item.headline} format={format} />
				</WithAgeWarning>
			);
		case ArticleDesign.NewsletterSignup:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={format}
				>
					{maybeRender(item.promotedNewsletter, (newsletter) => (
						<div css={detailBlockStyles}>
							<SvgNewsletter size="xsmall" />
							<b>{newsletter.frequency}</b>
							{/* TO DO - use regional focus, when on the MAPI type */}
						</div>
					))}
					<DefaultHeadline
						item={item}
						styles={css(defaultStyles(item))}
					/>
				</WithAgeWarning>
			);
		default:
			return (
				<WithAgeWarning
					tags={item.tags}
					publishDate={item.publishDate}
					format={format}
				>
					<Series item={item} />
					{designTag}
					<DefaultHeadline
						item={item}
						styles={css(defaultStyles(item))}
					/>
				</WithAgeWarning>
			);
	}
};

export default Headline;
