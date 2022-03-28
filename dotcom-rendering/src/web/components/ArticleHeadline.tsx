import { css } from '@emotion/react';

import {
	headline,
	textSans,
	from,
	until,
	space,
} from '@guardian/source-foundations';
import {
	ArticleDisplay,
	ArticleDesign,
	ArticleFormat,
	ArticleSpecial,
} from '@guardian/libs';
import { HeadlineTag } from './HeadlineTag';
import { HeadlineByline } from './HeadlineByline';

import { getZIndex } from '../lib/getZIndex';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { decidePalette } from '../lib/decidePalette';
import { AgeWarning } from './AgeWarning';
import { getAgeWarning } from '../../lib/age-warning';

type Props = {
	headlineString: string;
	format: ArticleFormat;
	byline?: string;
	tags: TagType[];
	webPublicationDateDeprecated: string;
};

const curly = (x: any) => x;

const topPadding = css`
	${from.leftCol} {
		padding-top: ${space[1]}px;
	}
`;

const standardFont = css`
	${headline.medium()};
	${until.tablet} {
		${headline.small()};
	}
`;

const labsFont = css`
	${textSans.xlarge({ fontWeight: 'bold' })};
	line-height: 32px;
	${from.tablet} {
		${textSans.xxxlarge({ fontWeight: 'bold' })};
		line-height: 38px;
	}
`;

const boldFont = css`
	${headline.medium({ fontWeight: 'bold' })};
	${until.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

const jumboFont = css`
	${headline.xlarge({ fontWeight: 'bold' })};
	line-height: 56px;
	${until.desktop} {
		${headline.medium({ fontWeight: 'bold' })};
	}
`;

const jumboLabsFont = css`
	${textSans.xxxlarge({ fontWeight: 'bold' })};
	font-size: 50px;
	line-height: 56px;
	${until.desktop} {
		${textSans.xxlarge({ fontWeight: 'bold' })};
		font-size: 34px;
		line-height: 38px;
	}
`;

const invertedFont = css`
	${headline.medium({ fontWeight: 'bold' })};
	line-height: 42px;
	${until.tablet} {
		${headline.small({ fontWeight: 'bold' })};
		line-height: 35px;
	}
`;

const lightFont = css`
	${headline.medium({ fontWeight: 'light' })};
	font-size: 2.125rem;
	line-height: 2.375rem;
	${until.mobileMedium} {
		${headline.small({ fontWeight: 'light' })};
	}
`;

const underlinedStyles = (colour: string) => css`
	background-image: repeating-linear-gradient(
		to bottom,
		transparent,
		transparent 47px,
		${colour}
	);
	line-height: 48px;
	background-size: 1rem 48px;
	${until.tablet} {
		background-image: repeating-linear-gradient(
			to bottom,
			transparent,
			transparent 39px,
			${colour}
		);
		line-height: 40px;
		background-size: 1px 40px;
	}

	background-position: top left;
	background-clip: content-box;
	background-origin: content-box;
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

const invertedStyles = (palette: Palette) => css`
	position: relative;
	white-space: pre-wrap;
	padding-bottom: ${space[1]}px;
	padding-right: ${space[1]}px;
	box-shadow: -6px 0 0 ${palette.background.headline};
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
`;

const immersiveStyles = css`
	min-height: 112px;
	padding-bottom: ${space[9]}px;
	padding-left: ${space[1]}px;
	${from.mobileLandscape} {
		padding-left: ${space[3]}px;
	}
	${from.tablet} {
		padding-left: ${space[1]}px;
	}
	margin-right: ${space[5]}px;
`;
const reducedBottomPadding = css`
	padding-bottom: ${space[4]}px;
`;

const darkBackground = (palette: Palette) => css`
	background-color: ${palette.background.headline};
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
	${getZIndex('articleHeadline')}
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

const HeadlineAgeWarning = ({
	tags,
	webPublicationDateDeprecated,
	isScreenReader = false,
	format,
}: {
	tags: TagType[];
	webPublicationDateDeprecated: string;
	isScreenReader?: boolean;
	format: ArticleFormat;
}) => {
	const palette = decidePalette(format);
	const ageWarningMargins =
		format.display === ArticleDisplay.Immersive
			? css`
					padding-top: 12px;
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
	const backgroundStyles = css`
		background-color: ${palette.background.headline};
	`;

	const age = getAgeWarning(tags, webPublicationDateDeprecated);

	if (age && isScreenReader) {
		return <AgeWarning age={age} isScreenReader={true} />;
	}

	if (age) {
		return (
			<div css={[ageWarningMargins, backgroundStyles]}>
				<AgeWarning age={age} />
			</div>
		);
	}

	return null;
};

export const ArticleHeadline = ({
	headlineString,
	format,
	tags,
	byline,
	webPublicationDateDeprecated,
}: Props) => {
	const palette = decidePalette(format);

	switch (format.display) {
		case ArticleDisplay.Immersive: {
			switch (format.design) {
				case ArticleDesign.PrintShop:
					return (
						// Immersive headlines have two versions, with main media, and (this one) without
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									jumboFont,
									maxWidth,
									immersiveStyles,
									displayBlock,
									reducedBottomPadding,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									lightFont,
									invertedText,
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
							{byline && (
								<HeadlineByline
									format={format}
									byline={byline}
									tags={tags}
								/>
							)}
						</>
					);
				default:
					return (
						// Immersive headlines with main media present, are large and inverted with
						// a black background
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									immersiveWrapper,
									darkBackground(palette),
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								<span
									css={[
										format.theme === ArticleSpecial.Labs
											? jumboLabsFont
											: jumboFont,
										maxWidth,
										invertedStyles(palette),
										immersiveStyles,
										displayBlock,
									]}
								>
									{curly(headlineString)}
								</span>
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</>
					);
			}
		}
		case ArticleDisplay.NumberedList:
			return (
				<>
					<HeadlineAgeWarning
						tags={tags}
						webPublicationDateDeprecated={
							webPublicationDateDeprecated
						}
						format={format}
					/>
					<h1
						css={[
							boldFont,
							topPadding,
							css`
								color: ${palette.text.headline};
							`,
						]}
					>
						{curly(headlineString)}
					</h1>
					<HeadlineAgeWarning
						tags={tags}
						webPublicationDateDeprecated={
							webPublicationDateDeprecated
						}
						format={format}
						isScreenReader={true}
					/>
				</>
			);
		case ArticleDisplay.Showcase:
		case ArticleDisplay.Standard:
		default: {
			switch (format.design) {
				case ArticleDesign.Review:
				case ArticleDesign.Recipe:
				case ArticleDesign.Feature:
					return (
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									boldFont,
									topPadding,
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
					return (
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									lightFont,
									topPadding,
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
							{byline && (
								<HeadlineByline
									format={format}
									byline={byline}
									tags={tags}
								/>
							)}
						</>
					);

				case ArticleDesign.Letter:
					return (
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									lightFont,
									topPadding,
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</>
					);
				case ArticleDesign.Analysis:
					return (
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									standardFont,
									topPadding,
									underlinedStyles(
										palette.background.analysisUnderline,
									),
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</>
					);
				case ArticleDesign.Interview:
					return (
						// Inverted headlines have a wrapper div for positioning
						// and a black background (only for the text)
						<div css={[shiftSlightly, maxWidth, displayFlex]}>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<HeadlineTag
								tagText="Interview"
								palette={palette}
							/>
							<h1
								css={[
									invertedFont,
									invertedWrapper,
									zIndex,
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								<span
									css={[
										darkBackground(palette),
										invertedStyles(palette),
										displayInline,
									]}
								>
									{curly(headlineString)}
								</span>
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
							{byline && (
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
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									standardFont,
									css`
										color: ${palette.text.headline};
										padding-bottom: ${space[9]}px;
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</>
					);
				case ArticleDesign.Interactive:
					return (
						<div
							css={css`
								position: relative;
							`}
						>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								className={interactiveLegacyClasses.headline}
								css={[
									standardFont,
									topPadding,
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</div>
					);
				default:
					return (
						<>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
							/>
							<h1
								css={[
									format.theme === ArticleSpecial.Labs
										? labsFont
										: standardFont,
									topPadding,
									css`
										color: ${palette.text.headline};
									`,
								]}
							>
								{curly(headlineString)}
							</h1>
							<HeadlineAgeWarning
								tags={tags}
								webPublicationDateDeprecated={
									webPublicationDateDeprecated
								}
								format={format}
								isScreenReader={true}
							/>
						</>
					);
			}
		}
	}
};
