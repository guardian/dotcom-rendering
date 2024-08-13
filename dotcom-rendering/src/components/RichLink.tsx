import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial, isUndefined } from '@guardian/libs';
import type { FontScaleArgs } from '@guardian/source/foundations';
import {
	from,
	headline,
	headlineMedium17,
	headlineMedium20,
	headlineMediumItalic20,
	textSans17,
	textSansBold12,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import { getSoleContributor, isContributor } from '../lib/byline';
import { palette as themePalette } from '../palette';
import ArrowInCircle from '../static/icons/arrow-in-circle.svg';
import type { StarRating as Rating } from '../types/content';
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
	starRating?: Rating;
	linkFormat: ArticleFormat;
	format: ArticleFormat;
	tags: TagType[];
	sponsorName: string;
	contributorImage?: string;
	isPlaceholder?: boolean; // use 'true' for server-side default prior to client-side enrichment
}
interface RichLinkImageData {
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

/** Re-sizes the headline.xxxsmall to 14px / 0.875rem as this isn't available in source */
const miniHeadlineOverrideStyles = (fontArgs: FontScaleArgs) => css`
	${headline.xxxsmall(
		fontArgs,
	)}; /** TODO (1) - Unknown argument please manually update */
	font-size: 0.875rem;
`;

const titleStyles = (parentIsBlog: boolean) => css`
	${parentIsBlog
		? headlineMedium17
		: miniHeadlineOverrideStyles({ fontWeight: 'regular' })};
	padding-top: 1px;
	padding-bottom: 1px;

	${from.wide} {
		${headlineMedium20};
		/**
		 * Typography preset styles should not be overridden.
		 * This has been done because the styles do not directly map to the new presets.
		 * Please speak to your team's designer and update this to use a more appropriate preset.
		 */
		font-weight: 400;
		padding-bottom: 5px;
	}
`;

const labsTitleStyles = css`
	${textSansBold15}

	${from.wide} {
		${textSansBold17}
	}
`;

const bylineStyles = css`
	color: ${themePalette('--rich-link-text')};
	${miniHeadlineOverrideStyles({ fontStyle: 'italic' })};

	${from.wide} {
		${headlineMediumItalic20};
	}
`;

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
	${textSansBold12};
`;

const starWrapperStyles = css`
	background-color: ${themePalette('--star-rating-background')};
	color: ${themePalette('--star-rating-fill')};
	display: inline-block;
`;

const readMoreStyles = css`
	fill: ${themePalette('--rich-link-fill')};
	padding-top: 2px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 6px;
`;

const readMoreTextStyle = css`
	${miniHeadlineOverrideStyles({ fontWeight: 'medium' })};
	color: ${themePalette('--rich-link-text')};
	padding-left: 4px;
	text-decoration: none;

	${from.wide} {
		${headlineMedium17}
	}
`;

const labsReadMoreTextStyle = css`
	${textSans17}
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

const getContributors = (tags: TagType[]): string =>
	tags
		.filter(isContributor)
		.map(({ title }) => title)
		.join(' and ');

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

	const isPaidContent = tags.some(
		({ id }) => id === 'tone/advertisement-features',
	);
	const isOpinion = cardStyle === 'comment';
	const byline = getContributors(tags);
	const soleContributor = getSoleContributor(tags, byline);

	const isLabs = linkFormat.theme === ArticleSpecial.Labs;

	return (
		<div
			data-print-layout="hide"
			data-link-name={`rich-link-${richLinkIndex} | ${richLinkIndex}`}
			data-component="rich-link"
			css={backgroundStyles}
			data-name={isPlaceholder ? 'placeholder' : undefined}
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
									titleStyles(parentIsBlog),
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

							{isOpinion && byline !== '' && (
								<div css={bylineStyles}>{byline}</div>
							)}

							{!isUndefined(starRating) ? (
								<div css={starWrapperStyles}>
									<StarRating
										rating={starRating}
										size="small"
									/>
								</div>
							) : null}

							{!!(isPaidContent && sponsorName) && (
								<div css={paidForBrandingStyles}>
									Paid for by {sponsorName}
								</div>
							)}
						</div>

						{!!(
							isOpinion &&
							contributorImage &&
							soleContributor
						) && (
							<div
								className="avatar"
								css={contributorWrapperStyles}
							>
								<Avatar
									src={contributorImage}
									alt={soleContributor.title}
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
