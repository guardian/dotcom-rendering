import { css } from '@emotion/react';
import {
	between,
	from,
	headlineBold28,
	headlineBold34,
	headlineBold50,
	headlineLight28,
	headlineLight34,
	headlineLight50,
	headlineMedium28,
	headlineMedium34,
	headlineMedium50,
	space,
	textSansBold28,
	textSansBold34,
	until,
} from '@guardian/source/foundations';
import { grid } from '../../src/grid';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { getAgeWarning } from '../lib/age-warning';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { palette as themePalette } from '../palette';
import type { TagType } from '../types/tag';
import { AgeWarning } from './AgeWarning';
import { DesignTag } from './DesignTag';
import { HeadlineByline } from './HeadlineByline';

type Props = {
	headlineString: string;
	format: ArticleFormat;
	byline?: string;
	tags: TagType[];
	webPublicationDateDeprecated: string;
	hasAvatar?: boolean;
	isMatch?: boolean;
};

const topPadding = css`
	${from.leftCol} {
		padding-top: ${space[1]}px;
	}
`;

const getFontWeightByDesign = (
	design: ArticleDesign,
): 'light' | 'medium' | 'bold' => {
	switch (design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
			return 'light';
		case ArticleDesign.Feature:
		case ArticleDesign.Review:
		case ArticleDesign.Recipe:
		case ArticleDesign.Interview:
		case ArticleDesign.Gallery:
			return 'bold';
		default:
			return 'medium';
	}
};

const isNewsNotCommentOrRecipeOrGallery = (format: ArticleFormat) =>
	format.theme === Pillar.News &&
	format.design !== ArticleDesign.Comment &&
	format.design !== ArticleDesign.Recipe &&
	format.design !== ArticleDesign.Gallery;

const decideHeadlineFont = (format: ArticleFormat) => {
	const size =
		format.display === ArticleDisplay.Immersive ||
		format.design === ArticleDesign.Gallery
			? 50
			: 34;
	if (isNewsNotCommentOrRecipeOrGallery(format)) {
		return size === 50 ? headlineMedium50 : headlineMedium34;
	}

	const fontWeight = getFontWeightByDesign(format.design);
	switch (fontWeight) {
		case 'light':
			return size === 50 ? headlineLight50 : headlineLight34;
		case 'bold':
			return size === 50 ? headlineBold50 : headlineBold34;
		default:
			return size === 50 ? headlineMedium50 : headlineMedium34;
	}
};

const decideMobileHeadlineFont = (format: ArticleFormat) => {
	const size =
		format.display === ArticleDisplay.Immersive ||
		format.design === ArticleDesign.Gallery
			? 34
			: 28;
	if (isNewsNotCommentOrRecipeOrGallery(format)) {
		return size === 34 ? headlineMedium34 : headlineMedium28;
	}

	const fontWeight = getFontWeightByDesign(format.design);
	switch (fontWeight) {
		case 'light':
			return size === 34 ? headlineLight34 : headlineLight28;
		case 'bold':
			return size === 34 ? headlineBold34 : headlineBold28;
		default:
			return size === 34 ? headlineMedium34 : headlineMedium28;
	}
};

const headlineFont = (format: ArticleFormat) => {
	if (format.design === ArticleDesign.Gallery) {
		return css`
			${decideMobileHeadlineFont(format)}

			${from.desktop} {
				${decideHeadlineFont(format)}
			}
		`;
	}
	return css`
		${decideMobileHeadlineFont(format)}

		${from.tablet} {
			${decideHeadlineFont(format)}
		}
	`;
};

const invertedFontLineHeight = css`
	line-height: 2.1875rem;
	${from.tablet} {
		line-height: 2.625rem;
	}
`;

const labsFont = css`
	${textSansBold28};
	line-height: 2rem;
	${from.tablet} {
		${textSansBold34};
		line-height: 2.375rem;
	}
`;

const jumboLabsFont = css`
	${textSansBold34};
	font-size: 3.125rem;
	line-height: 3.5rem;
	${until.desktop} {
		${textSansBold34};
		line-height: 2.375rem;
	}
`;

const displayBlock = css`
	display: block;
`;

const displayInline = css`
	display: inline;
`;

const displayFlex = css`
	display: flex;
	flex-direction: column;
`;

const shiftSlightly = css`
	margin-bottom: 16px;
`;

const invertedStyles = css`
	position: relative;
	white-space: pre-wrap;
	padding-right: ${space[1]}px;
	padding-bottom: ${space[1]}px;
	box-shadow: -6px 0 0 ${themePalette('--headline-background')};
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
`;

const immersiveStyles = css`
	min-height: 112px;
	padding-bottom: ${space[6]}px;
	padding-left: ${space[1]}px;
	${from.mobileLandscape} {
		padding-left: ${space[3]}px;
	}
	${from.tablet} {
		padding-left: ${space[1]}px;
	}
	margin-right: ${space[5]}px;
`;

const darkBackground = css`
	background-color: ${themePalette('--headline-background')};
`;

const invertedText = css`
	white-space: pre-wrap;
	padding-bottom: ${space[1]}px;
	padding-right: ${space[1]}px;
`;

const maxWidth = css`
	${from.desktop} {
		max-width: 620px;
	}
`;

const invertedWrapper = css`
	/*
        Because we use box-shadow (to get clean and even background styles
        even when lines wrap) we need a margin on this wrapper div to
        shift everything back to the right
    */
	margin-left: 6px;
`;

const immersiveWrapper = css`
	/*
        Make sure we vertically align the headline font with the body font
    */
	margin-left: 6px;
	${from.tablet} {
		margin-left: 16px;
	}
	${from.leftCol} {
		margin-left: 25px;
	}
	/*
        We need this grow to ensure the headline fills the main content column
    */
	flex-grow: 1;
	/*
        This z-index is what ensures the headline text shows above the pseudo black
        box that extends the black background to the right
    */
	z-index: ${getZIndex('articleHeadline')};
	${until.mobileLandscape} {
		margin-right: 40px;
	}
`;

// Due to MainMedia using position: relative, this seems to effect the rendering order
// To mitigate we use z-index
// TODO: find a cleaner solution
const zIndex = css`
	z-index: 1;
`;

const ageWarningMargins = (format: ArticleFormat) => {
	if (format.design === ArticleDesign.Gallery) {
		return '';
	}
	return format.display === ArticleDisplay.Immersive
		? css`
				margin-left: 0px;
				margin-bottom: 0px;

				${from.tablet} {
					margin-left: 10px;
				}

				${from.leftCol} {
					margin-left: 20px;
				}
		  `
		: css`
				margin-top: 12px;
				margin-left: -10px;
				margin-bottom: 6px;

				${from.tablet} {
					margin-left: -20px;
				}

				${from.leftCol} {
					margin-left: -10px;
					margin-top: 0;
				}
		  `;
};

const backgroundStyles = css`
	background-color: ${themePalette('--age-warning-wrapper-background')};
`;

const WithAgeWarning = ({
	tags,
	webPublicationDateDeprecated,
	format,
	children,
}: {
	tags: TagType[];
	webPublicationDateDeprecated: string;
	format: ArticleFormat;
	children: React.ReactNode;
}) => {
	const age = getAgeWarning(tags, webPublicationDateDeprecated);

	if (age) {
		return (
			<>
				<div css={[backgroundStyles, ageWarningMargins(format)]}>
					<AgeWarning age={age} />
				</div>
				{children}
				<AgeWarning age={age} isScreenReader={true} />
			</>
		);
	}

	return <>{children}</>;
};

const decideBottomPadding = ({
	format,
	hasAvatar,
}: {
	format: ArticleFormat;
	hasAvatar?: boolean;
}) => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return css`
				padding-bottom: ${space[6]}px;
			`;
		default: {
			switch (format.design) {
				case ArticleDesign.Interview: {
					if (format.display === ArticleDisplay.Showcase) {
						return css`
							padding-bottom: ${space[1]}px;
							${from.tablet} {
								padding-bottom: ${space[6]}px;
							}
						`;
					}
					return css`
						padding-bottom: ${space[2]}px;
					`;
				}
				case ArticleDesign.Review: {
					if (format.display === ArticleDisplay.Showcase) {
						return css`
							padding-bottom: 28px;
							${from.tablet} {
								padding-bottom: ${space[6]}px;
							}
						`;
					} else {
						return css`
							padding-bottom: ${space[5]}px;

							${from.tablet} {
								padding-bottom: ${space[6]}px;
							}
						`;
					}
				}
				default:
					return hasAvatar
						? ''
						: css`
								padding-bottom: 28px;
								${from.tablet} {
									padding-bottom: ${space[9]}px;
								}
						  `;
			}
		}
	}
};

const galleryStyles = css`
	${grid.between('grid-start', 'centre-column-end')}

	grid-row: 7/9;

	${from.tablet} {
		${grid.between('centre-column-start', 'grid-end')};
		margin-left: -10px;
	}
`;

export const ArticleHeadline = ({
	headlineString,
	format,
	tags,
	byline,
	webPublicationDateDeprecated,
	hasAvatar,
	isMatch,
}: Props) => {
	switch (format.display) {
		case ArticleDisplay.Immersive: {
			switch (format.design) {
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										invertedText,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
							{!!byline && (
								<HeadlineByline
									format={format}
									byline={byline}
									tags={tags}
								/>
							)}
						</div>
					);
				default:
					return (
						// Immersive headlines with main media present, are large and inverted with
						// a black background. They also have no padding and we want to avoid any
						// wrapper div as this affects the z-index stack
						<WithAgeWarning
							tags={tags}
							webPublicationDateDeprecated={
								webPublicationDateDeprecated
							}
							format={format}
						>
							<h1
								css={[
									immersiveWrapper,
									darkBackground,
									css`
										color: ${themePalette(
											'--headline-colour',
										)};
									`,
								]}
							>
								<span
									css={[
										format.theme === ArticleSpecial.Labs
											? jumboLabsFont
											: headlineFont(format),
										maxWidth,
										invertedStyles,
										immersiveStyles,
										displayBlock,
									]}
								>
									{headlineString}
								</span>
							</h1>
						</WithAgeWarning>
					);
			}
		}
		case ArticleDisplay.NumberedList:
			return (
				<div
					css={decideBottomPadding({
						format,
						hasAvatar,
					})}
				>
					<WithAgeWarning
						tags={tags}
						webPublicationDateDeprecated={
							webPublicationDateDeprecated
						}
						format={format}
					>
						<DesignTag format={format} />
						<h1
							css={[
								format.theme === ArticleSpecial.Labs
									? labsFont
									: headlineFont(format),
								topPadding,
								css`
									color: ${themePalette('--headline-colour')};
								`,
							]}
						>
							{headlineString}
						</h1>
					</WithAgeWarning>
				</div>
			);
		case ArticleDisplay.Showcase:
		case ArticleDisplay.Standard:
		default: {
			switch (format.design) {
				case ArticleDesign.Review:
				case ArticleDesign.Recipe:
				case ArticleDesign.Feature:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.Profile:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										topPadding,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
						</div>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										topPadding,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
							{!!byline && (
								<HeadlineByline
									format={format}
									byline={byline}
									tags={tags}
								/>
							)}
						</div>
					);

				case ArticleDesign.Letter:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										topPadding,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
						</div>
					);
				case ArticleDesign.Interview:
					return (
						// Inverted headlines have a wrapper div for positioning
						// and a black background (only for the text)
						<div
							css={[
								shiftSlightly,
								maxWidth,
								displayFlex,
								decideBottomPadding({
									format,
									hasAvatar,
								}),
							]}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										invertedWrapper,
										invertedFontLineHeight,
										zIndex,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									<span
										css={[
											darkBackground,
											invertedStyles,
											displayInline,
										]}
									>
										{headlineString}
									</span>
								</h1>
							</WithAgeWarning>
							{!!byline && (
								<HeadlineByline
									format={format}
									byline={byline}
									tags={tags}
								/>
							)}
						</div>
					);
				case ArticleDesign.Analysis:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										topPadding,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
							{!!byline && (
								<HeadlineByline
									format={format}
									byline={byline}
									tags={tags}
								/>
							)}
						</div>
					);
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										css`
											color: ${isMatch
												? themePalette(
														'--headline-match-colour',
												  )
												: themePalette(
														'--headline-colour',
												  )};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
						</div>
					);
				case ArticleDesign.Interactive:
					return (
						<div
							css={[
								decideBottomPadding({
									format,
									hasAvatar,
								}),
								css`
									position: relative;
								`,
							]}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									className={
										interactiveLegacyClasses.headline
									}
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										topPadding,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
						</div>
					);
				case ArticleDesign.Picture:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<DesignTag format={format} />
							<h1
								css={[
									format.theme === ArticleSpecial.Labs
										? labsFont
										: headlineFont(format),
									topPadding,
									css`
										color: ${themePalette(
											'--headline-colour',
										)};
									`,
								]}
							>
								{headlineString}
							</h1>
						</div>
					);
				case ArticleDesign.Gallery: {
					return (
						<div css={galleryStyles}>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
											${darkBackground};
											min-height: 84px;
											padding-bottom: ${space[6]}px;
											padding-left: ${space[3]}px;
											padding-right: ${space[3]}px;

											${between.mobileLandscape.and
												.tablet} {
												padding-left: ${space[5]}px;
											}
										`,
									]}
								>
									<span css={[displayBlock, maxWidth]}>
										{headlineString}
									</span>
								</h1>
							</WithAgeWarning>
						</div>
					);
				}
				default:
					return (
						<div
							css={decideBottomPadding({
								format,
								hasAvatar,
							})}
						>
							<WithAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							>
								<DesignTag format={format} />
								<h1
									css={[
										format.theme === ArticleSpecial.Labs
											? labsFont
											: headlineFont(format),
										topPadding,
										css`
											color: ${themePalette(
												'--headline-colour',
											)};
										`,
									]}
								>
									{headlineString}
								</h1>
							</WithAgeWarning>
						</div>
					);
			}
		}
	}
};
