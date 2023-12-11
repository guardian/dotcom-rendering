import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { from, headline, textSans } from '@guardian/source-foundations';
import { palette as themePalette } from '../palette';
import ArrowInCircle from '../static/icons/arrow-in-circle.svg';
import type { TagType } from '../types/tag';
import { Avatar } from './Avatar';
import { FormatBoundary } from './FormatBoundary';
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

const backgroundStyles = css`
	background-color: ${themePalette('--rich-link-background')};
	:hover {
		background-color: ${themePalette('--rich-link-background-hover')};
	}
`;

const linkStyles = css`
	color: inherit;
	text-decoration: none;
`;

const topBorderStyles = css`
	border-top: 1px;
	border-top-style: solid;
	border-top-color: ${themePalette('--rich-link-border')};
`;

const innerWrapperStyles = css`
	padding-top: 2px;
	padding-right: 5px;
	padding-left: 5px;
	padding-bottom: 5px;
`;

const headerStyles = css`
	padding-bottom: 10px;
	color: ${themePalette('--rich-link-header')};
`;

const smallFontStyles = css`
	font-size: 0.875rem;
`;

const titleStyles = () => {
	const fontWeight = 'light';

	return css`
		${headline.xxxsmall({ fontWeight })};
		${smallFontStyles}
		padding-top: 1px;
		padding-bottom: 1px;

		${from.wide} {
			${headline.xxsmall({ fontWeight })};
			padding-bottom: 5px;
		}
	`;
};

const labsTitleStyles = () => {
	const fontWeight = 'bold';

	return css`
		${textSans.small({ fontWeight })}

		${from.wide} {
			${textSans.medium({ fontWeight })}
		}
	`;
};

const bylineStyles = () => {
	const fontStyle = 'italic';

	return css`
		color: ${themePalette('--rich-link-text')};
		${headline.xxxsmall({ fontStyle })};
		${smallFontStyles}

		${from.wide} {
			${headline.xxsmall({ fontStyle })};
		}
	`;
};

const contributorWrapperStyles = css`
	width: 5rem;
	height: 5rem;
	margin-left: auto;
	margin-right: 0.3rem;

	${from.wide} {
		width: 8.5rem;
		height: 8.5rem;
	}
`;

const paidForBrandingStyles = css`
	color: ${themePalette('--rich-link-branding-text')};
	${textSans.xxsmall({ fontWeight: 'bold' })};
`;

const starWrapperStyles = css`
	background-color: ${themePalette('--star-rating-background')};
	color: ${themePalette('--star-rating-fill')};
	display: inline-block;
`;

const readMoreStyles = css`
	fill: ${themePalette('--rich-link-fill')};
	padding-top: 2px;
`;

const readMoreTextStyle = () => {
	const fontWeight = 'medium';

	return css`
		${headline.xxxsmall({ fontWeight })};
		${smallFontStyles}
		color: ${themePalette('--rich-link-text')};
		display: inline-block;
		height: 30px;
		padding-left: 4px;
		vertical-align: top;
		text-decoration: none;

		${from.wide} {
			${headline.xxxsmall({ fontWeight })}
		}
	`;
};

const labsReadMoreTextStyle = css`
	${textSans.medium({ fontWeight: 'regular' })}
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

	return (
		<div
			data-print-layout="hide"
			data-link-name={`rich-link-${richLinkIndex} | ${richLinkIndex}`}
			data-component="rich-link"
			css={backgroundStyles}
			data-name={isPlaceholder ? 'placeholder' : ''}
		>
			<FormatBoundary format={linkFormat}>
				<a css={linkStyles} href={url}>
					<div css={topBorderStyles} />

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

					<div css={innerWrapperStyles}>
						<div css={headerStyles}>
							<div
								css={[
									titleStyles,
									!parentIsBlog && smallFontStyles,
									isLabs && labsTitleStyles,
								]}
							>
								{isOpinion && (
									<QuoteIcon
										colour={themePalette(
											'--quote-icon-fill',
										)}
									/>
								)}

								{linkText}
							</div>

							{isOpinion && (
								<div css={bylineStyles}>{mainContributor}</div>
							)}

							{starRating !== undefined && (
								<div css={starWrapperStyles}>
									<StarRating
										rating={starRating}
										size="medium"
									/>
								</div>
							)}

							{!!(isPaidContent && sponsorName) && (
								<div css={paidForBrandingStyles}>
									Paid for by {sponsorName}
								</div>
							)}
						</div>

						{!!(isOpinion && contributorImage) && (
							<div css={contributorWrapperStyles}>
								<Avatar
									src={contributorImage}
									alt={mainContributor}
								/>
							</div>
						)}

						<div css={readMoreStyles}>
							<ArrowInCircle />

							<div
								css={[
									readMoreTextStyle,
									isLabs && labsReadMoreTextStyle,
								]}
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
