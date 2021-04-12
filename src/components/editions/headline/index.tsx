// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import type {
	FontWeight,
	LineHeight,
} from '@guardian/src-foundations/dist/types/typography/types';
import { from } from '@guardian/src-foundations/mq';
import { border, neutral } from '@guardian/src-foundations/palette';
import { headline, titlepiece } from '@guardian/src-foundations/typography';
import { SvgQuote } from '@guardian/src-icons';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import { editionsHeadlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import Series from '../series';
import { articleWidthStyles } from '../styles';

// ----- Template Format Specific Styles ----- //

const analysisStyles = (kickerColor: string): SerializedStyles => css`
	text-decoration: underline;
	text-decoration-thickness: from-font;
	text-decoration-color: ${kickerColor};
	padding-bottom: 0;
`;

const commentStyles = css`
	padding-bottom: 0;
	padding-right: 6rem;
`;

const galleryStyles = css`
	${titlepiece.small()}
	font-size: 2rem;
	line-height: 1.2;
	padding-bottom: ${remSpace[6]};
	background-color: ${neutral[7]};
	border: 0;

	${articleWidthStyles}
`;

const headlineWrapperStyles = css`
	position: relative;
`;

const immersiveStyles = css`
	border: 0;
	padding-left: ${remSpace[2]};
	padding-top: 0.0625rem;
	padding-bottom: ${remSpace[6]};
	background-color: ${neutral[7]};

	${from.tablet} {
		padding-left: 0;
	}
`;

const interviewStyles = css`
	margin-left: ${remSpace[3]};
	border: 0;

	${articleWidthStyles}
`;

const interviewFontStyles = css`
	${headline.xsmall({ lineHeight: 'regular' })}
	font-weight: 400;

	${from.mobileMedium} {
		${headline.small({ lineHeight: 'regular' })}
		font-weight: 400;
	}

	${from.tablet} {
		${headline.medium({ lineHeight: 'regular' })}
		font-weight: 400;
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

const seriesStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
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

const getSharedStyles = (format: Format): SerializedStyles => css`
	${editionsHeadlineTextColour(format)}
	box-sizing: border-box;
	border-top: 1px solid ${border.secondary};
	padding-bottom: ${remSpace[4]};
	padding-right: ${remSpace[2]};
	margin: 0;
`;

const getQuoteStyles = (format: Format): SerializedStyles => {
	const { kicker } = getThemeStyles(format.theme);

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

	if (item.design === Design.Interview) {
		return <span css={interviewFontStyles}>{item.headline}</span>;
	}

	if (item.design === Design.Comment) {
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
	format: Format,
	kickerColor: string,
): SerializedStyles => {
	const sharedStyles = getSharedStyles(format);

	if (format.display === Display.Immersive) {
		return css(
			sharedStyles,
			getFontStyles('tight', 'bold'),
			immersiveStyles,
		);
	}

	// this needs to come before Display.Showcase
	if (format.design === Design.Comment || format.design === Design.Letter) {
		return css(
			sharedStyles,
			getFontStyles('regular', 'light'),
			commentStyles,
		);
	}

	// this needs to come before Display.Showcase
	if (format.design === Design.Interview) {
		return css(
			sharedStyles,
			getFontStyles('tight', 'bold'),
			interviewStyles,
		);
	}

	if (format.display === Display.Showcase) {
		return css(sharedStyles, getFontStyles('tight', 'bold'));
	}

	switch (format.design) {
		case Design.Review:
			return css(sharedStyles, getFontStyles('tight', 'bold'));
		case Design.Analysis:
			return css(
				sharedStyles,
				getFontStyles('regular', 'light'),
				analysisStyles(kickerColor),
			);
		case Design.Media:
			return css(sharedStyles, galleryStyles);
	}

	return css(sharedStyles, getFontStyles('tight', 'medium'));
};

const hasSeriesKicker = (format: Format): boolean =>
	format.display === Display.Immersive || format.design === Design.Interview;

// ----- Component ----- //

interface Props {
	item: Item;
}

const Headline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	return (
		<div css={headlineWrapperStyles}>
			{hasSeriesKicker(format) && (
				<div css={seriesStyles}>
					<Series item={item} />
				</div>
			)}
			<h1 css={getHeadlineStyles(format, kickerColor)}>
				{getDecorativeStyles(item)}
			</h1>
		</div>
	);
};

// ----- Exports ----- //

export default Headline;
