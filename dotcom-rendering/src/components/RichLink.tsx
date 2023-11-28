import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { from, headline, textSans } from '@guardian/source-foundations';
import { palette as themePalette } from '../palette';
import ArrowInCircle from '../static/icons/arrow-in-circle.svg';
import type { TagType } from '../types/tag';
import { Avatar } from './Avatar';
import { FormatBoundary } from './FormatBoundary';
import { Hide } from './Hide';
import { QuoteIcon } from './QuoteIcon';
import { StarRating } from './StarRating/StarRating';

interface Props {
	richLinkIndex: number;
	cardStyle: RichLinkCardType;
	imageData: RichLinkImageData;
	headlineText: string;
	contentType: ContentType;
	url: string;
	starRating?: number;
	linkFormat: ArticleFormat;
	format: ArticleFormat;
	tags: TagType[];
	sponsorName: string;
	contributorImage?: string;
	isPlaceholder?: boolean; // use 'true' for server-side default prior to client-side enrichment
}
export interface RichLinkImageData {
	thumbnailUrl: string;
	altText: string;
	width: string;
	height: string;
}

const neutralBackground = css`
	background-color: ${themePalette('--rich-link-background')};
	a {
		color: inherit;
	}
	:hover {
		background-color: ${themePalette('--rich-link-background-hover')};
	}
`;

const pillarBackground = css`
	background-color: ${themePalette('--rich-link-pillar-background')};
`;

const textColour = () => {
	return themePalette('--rich-link-text');
};

const richLinkTopBorder = css`
	border-top: 1px;
	border-top-style: solid;
	border-top-color: ${themePalette('--rich-link-border-top')};
`;

const richLinkLink = css`
	text-decoration: none;
`;

const richLinkElements = css`
	padding-top: 2px;
	padding-right: 5px;
	padding-left: 5px;
	padding-bottom: 5px;
`;

const richLinkHeader = css`
	padding-bottom: 10px;
	color: ${themePalette('--rich-link-header')};
`;

const richLinkTitle = (parentIsBlog: boolean) => css`
	${headline.xxxsmall()};
	${!parentIsBlog && 'font-size: 14px'};
	padding-top: 1px;
	padding-bottom: 1px;
	font-weight: 400;
	${from.wide} {
		${headline.xxsmall()};
		padding-bottom: 5px;
	}
`;

const labsRichLinkTitle = css`
	${from.wide} {
		${textSans.medium({ fontWeight: 'bold', lineHeight: 'regular' })}
	}
	${textSans.small({ fontWeight: 'bold', lineHeight: 'regular' })}
`;

const richLinkReadMore = css`
	fill: ${themePalette('--rich-link-fill')};
	color: ${themePalette('--rich-link-text')};
	padding-top: 2px;
`;

const readMoreTextStyle = css`
	${headline.xxxsmall()};
	font-size: 14px;
	${from.wide} {
		${headline.xxxsmall()}
		line-height: 25px;
	}
	display: inline-block;
	height: 30px;
	line-height: 25px;
	padding-left: 4px;
	vertical-align: top;
	font-weight: 500;
	text-decoration: none;
`;

const labsReadMoreTextStyle = css`
	${textSans.medium({ fontWeight: 'regular' })}
	display: inline-block;
	height: 30px;
	line-height: 25px;
	padding-left: 4px;
	vertical-align: top;
	text-decoration: none;
	color: ${themePalette('--rich-link-text')};
`;

const byline = css`
	${headline.xxxsmall()};
	font-size: 14px;
	font-style: italic;
	${from.wide} {
		${headline.xxsmall()};
	}
`;

const contributorImageWrapper = css`
	width: 5rem;
	height: 5rem;
	margin-left: auto;
	margin-right: 0.3rem;
	${from.wide} {
		width: 8.5rem;
		height: 8.5rem;
	}

	/* TODO remove the default img styling in ArticleBody.tsx - do we need direct element styling? */
	img {
		width: 100%;
		height: 100%;
	}
`;

const paidForBranding = css`
	${textSans.xxsmall()};
	font-weight: bold;
	color: ${themePalette('--rich-link-branding-text')};
`;

const starWrapper = css`
	background-color: ${themePalette('--star-rating-background')};
	color: ${themePalette('--star-rating-fill')};
	display: inline-block;
`;

const readMoreText: (contentType: string) => string = (contentType) => {
	switch (contentType) {
		case 'audio':
			return 'Listen';
		case 'gallery':
			return 'View Gallery';
		case 'video':
			return 'Watch';
		default:
			return 'Read more';
	}
};

const getMainContributor: (tags: TagType[]) => string = (tags) => {
	const [firstContributorTag] = tags.filter((t) => t.type === 'Contributor');
	return firstContributorTag ? firstContributorTag.title : '';
};

const imageStyles = css`
	width: 100%;
	height: auto;
`;

export const RichLink = ({
	richLinkIndex,
	cardStyle,
	imageData,
	headlineText,
	contentType,
	url,
	starRating,
	linkFormat,
	format,
	tags,
	sponsorName,
	contributorImage,
	isPlaceholder,
}: Props) => {
	const linkText =
		cardStyle === 'letters' ? `${headlineText} | Letters ` : headlineText;

	const imageCardStyles = ['news', 'letters', 'media', 'feature'];
	const parentIsBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	const showImage =
		imageData.thumbnailUrl !== '' &&
		imageCardStyles.includes(cardStyle) &&
		!parentIsBlog;
	const isPaidContent = !!tags.find(
		({ id }) => id === 'tone/advertisement-features',
	);
	const isOpinion = cardStyle === 'comment';
	const mainContributor = getMainContributor(tags);
	const isLabs = linkFormat.theme === ArticleSpecial.Labs;

	const richLinkTitlePicker = isLabs
		? labsRichLinkTitle
		: richLinkTitle(parentIsBlog);

	return (
		<div
			data-print-layout="hide"
			data-link-name={`rich-link-${richLinkIndex} | ${richLinkIndex}`}
			data-component="rich-link"
			css={[pillarBackground, neutralBackground]}
			data-name={isPlaceholder ? 'placeholder' : ''}
		>
			<FormatBoundary format={format}>
				<a css={richLinkLink} href={url}>
					<div css={richLinkTopBorder} />
					{showImage && (
						<div>
							<img
								css={imageStyles}
								src={imageData.thumbnailUrl}
								alt={imageData.altText}
								width={imageData.width}
								height={imageData.height}
							/>
						</div>
					)}
					<div css={richLinkElements}>
						<div css={richLinkHeader}>
							<div css={richLinkTitlePicker}>
								{isOpinion && (
									<>
										<Hide when="above" breakpoint="wide">
											<QuoteIcon
												colour={themePalette(
													'--rich-link-quote-icon',
												)}
											/>
										</Hide>
										<Hide when="below" breakpoint="wide">
											<QuoteIcon
												colour={themePalette(
													'--rich-link-quote-icon',
												)}
											/>
										</Hide>
									</>
								)}
								{linkText}
							</div>
							{isOpinion && (
								<div css={[byline, textColour]}>
									{mainContributor}
								</div>
							)}
							{starRating !== undefined && (
								<div css={starWrapper}>
									<StarRating
										rating={starRating}
										size="medium"
									/>
								</div>
							)}
							{!!(isPaidContent && sponsorName) && (
								<div css={paidForBranding}>
									Paid for by {sponsorName}
								</div>
							)}
						</div>
						{!!(isOpinion && contributorImage) && (
							<div css={contributorImageWrapper}>
								<Avatar
									src={contributorImage}
									alt={mainContributor}
								/>
							</div>
						)}
						<div css={richLinkReadMore}>
							<ArrowInCircle />
							<div
								css={
									isLabs
										? labsReadMoreTextStyle
										: readMoreTextStyle
								}
							>
								{readMoreText(contentType)}
							</div>
						</div>
					</div>
				</a>
			</FormatBoundary>
		</div>
	);
};
