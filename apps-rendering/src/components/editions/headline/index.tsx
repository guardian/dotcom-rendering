// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { FontWeight, LineHeight } from '@guardian/source-foundations';
import {
	border,
	from,
	headline,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import { SvgQuote } from '@guardian/source-react-components';
import { OptionKind } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { index } from 'lib';
import { MainMediaKind } from 'mainMedia';
import { text } from 'palette';
import type { FC } from 'react';
import Series from '../series';
import {
	articleWidthStyles,
	tabletContentWidth,
	wideContentWidth,
} from '../styles';

const wide = wideContentWidth + 12;
const tablet = tabletContentWidth + 12;

// ----- Template ArticleFormat Specific Styles ----- //

const analysisStyles = (kickerColor: string): SerializedStyles => css`
	text-decoration: underline;
	text-decoration-thickness: from-font;
	text-decoration-color: ${kickerColor};
	padding-bottom: 0;
`;

const commentStyles = (hasImage: boolean): SerializedStyles => css`
	padding-bottom: 0;
	padding-right: ${hasImage ? '6rem' : 0};
`;

const galleryStyles = css`
	${headline.xsmall()}
	box-sizing: border-box;
	padding-bottom: ${remSpace[6]};
	background-color: ${neutral[7]};
	border: none;
	${from.mobileMedium} {
		${headline.medium()}
	}
	${from.tablet} {
		${headline.large()}
		width: ${tablet}px;
		padding-right: ${remSpace[4]};
		border-right: 1px solid ${neutral[100]};
	}

	${from.desktop} {
		width: ${wide}px;
	}
`;

const headlineWrapperStyles = css`
	position: relative;
`;

const immersiveStyles = css`
	border: 0;
	padding-left: ${remSpace[3]};
	padding-top: 0.0625rem;
	padding-bottom: ${remSpace[6]};
	background-color: ${neutral[7]};
	min-height: 3.5rem;

	${from.tablet} {
		padding-left: 0;
		min-height: 4.625rem;
	}
`;

const interviewStyles = css`
	margin-left: ${remSpace[3]};
	border: 0;
	min-height: 3.5rem;
	${articleWidthStyles}

	${from.tablet} {
		min-height: 4.625rem;
	}
`;

const interviewFontStyles = css`
	${headline.xsmall({ lineHeight: 'regular' })}
	${from.mobileMedium} {
		${headline.small({ lineHeight: 'regular' })}
	}
	${from.tablet} {
		${headline.medium({ lineHeight: 'regular' })}
	}
	background-color: ${neutral[7]};
	color: ${neutral[100]};
	white-space: pre-wrap;
	padding-top: 0.0625rem;
	padding-bottom: ${remSpace[1]};
	box-shadow: -${remSpace[3]} 0 0 ${neutral[7]},
		${remSpace[3]} 0 0 ${neutral[7]};
	display: inline;
`;

const seriesStyles = (isInterviewVideoHeader: boolean): SerializedStyles => css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	display: ${isInterviewVideoHeader ? 'none' : 'block'};

	${from.desktop} {
		display: block;
	}
`;

// ----- Headline Component Styles ----- //

const getFontStyles = (
	lineHeight: LineHeight,
	fontWeight: FontWeight,
): SerializedStyles => css`
	${headline.xsmall({ lineHeight, fontWeight })}

	${from.mobileMedium} {
		${headline.small({ lineHeight, fontWeight })}
	}

	${from.tablet} {
		${headline.medium({ lineHeight, fontWeight })}
	}
`;

const getSharedStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.headline(format)};
	box-sizing: border-box;
	border-top: 1px solid ${border.secondary};
	padding-bottom: ${remSpace[4]};
	padding-right: ${remSpace[3]};
	margin: 0;
`;

const getQuoteStyles = (format: ArticleFormat): SerializedStyles => {
	const kicker = text.editionsKicker(format);

	return css`
		margin: 0;
		svg {
			margin-bottom: -0.65rem;
			width: 40px;
			margin-left: -0.3rem;
			fill: ${kicker};
		}

		${from.tablet} {
			svg {
				margin-bottom: -0.75rem;
				width: 50px;
			}
		}
	`;
};

const getDecorativeStyles = (item: Item): JSX.Element | string => {
	const format = getFormat(item);

	if (item.design === ArticleDesign.Interview) {
		return <span css={interviewFontStyles}>{item.headline}</span>;
	}

	if (item.design === ArticleDesign.Comment) {
		return (
			<span css={getQuoteStyles(format)}>
				<SvgQuote />
				{item.headline}
			</span>
		);
	}
	return item.headline;
};

const getHeadlineStyles = (
	format: ArticleFormat,
	kickerColor: string,
	hasImage: boolean,
): SerializedStyles => {
	const sharedStyles = getSharedStyles(format);

	if (format.display === ArticleDisplay.Immersive) {
		return css(
			sharedStyles,
			getFontStyles('tight', 'bold'),
			immersiveStyles,
		);
	}

	// this needs to come before ArticleDisplay.Showcase
	if (format.design === ArticleDesign.Comment) {
		return css(
			sharedStyles,
			getFontStyles('tight', 'light'),
			commentStyles(hasImage),
		);
	}

	// this needs to come before ArticleDisplay.Showcase
	if (format.design === ArticleDesign.Letter) {
		return css(sharedStyles, getFontStyles('tight', 'light'));
	}

	// this needs to come before ArticleDisplay.Showcase
	if (format.design === ArticleDesign.Interview) {
		return css(
			sharedStyles,
			getFontStyles('tight', 'bold'),
			interviewStyles,
		);
	}

	if (format.display === ArticleDisplay.Showcase) {
		return css(sharedStyles, getFontStyles('tight', 'bold'));
	}

	switch (format.design) {
		case ArticleDesign.Review:
			return css(sharedStyles, getFontStyles('tight', 'bold'));
		case ArticleDesign.Analysis:
			return css(
				sharedStyles,
				getFontStyles('regular', 'light'),
				analysisStyles(kickerColor),
			);
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return css(sharedStyles, galleryStyles);
	}

	return css(sharedStyles, getFontStyles('tight', 'medium'));
};

const hasSeriesKicker = (format: ArticleFormat): boolean =>
	format.display === ArticleDisplay.Immersive ||
	format.design === ArticleDesign.Interview;

const isInterviewHeadline = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.Interview;

// ----- Component ----- //

interface Props {
	item: Item;
}

const Headline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const kickerColor = text.editionsKicker(format);
	const contributor = index(0)(item.contributors);

	const hasImage =
		contributor.kind === OptionKind.Some &&
		contributor.value.image.kind === OptionKind.Some;

	const isVideo =
		item.mainMedia.kind === OptionKind.Some &&
		item.mainMedia.value.kind === MainMediaKind.Video;

	const isInterview = isInterviewHeadline(format);
	const isInterviewVideoHeader = isInterview && isVideo;

	return (
		<div css={headlineWrapperStyles}>
			{hasSeriesKicker(format) && (
				<div css={seriesStyles(isInterviewVideoHeader)}>
					<Series item={item} />
				</div>
			)}
			<h1 css={getHeadlineStyles(format, kickerColor, hasImage)}>
				{getDecorativeStyles(item)}
			</h1>
		</div>
	);
};

// ----- Exports ----- //

export default Headline;
