// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border, neutral } from '@guardian/src-foundations/palette';
import { headline, titlepiece } from '@guardian/src-foundations/typography';
import type {
	FontWeight,
	LineHeight,
} from '@guardian/src-foundations/typography/types';
import { SvgQuote } from '@guardian/src-icons';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import { headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import Series from './series';
import { articleWidthStyles } from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const quoteStyles = (format: Format): SerializedStyles => {
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

const styles = (format: Format): SerializedStyles => css`
	${headlineTextColour(format)}
	box-sizing: border-box;
	border-top: 1px solid ${border.secondary};
	padding-bottom: ${remSpace[4]};
	margin: 0;

	${articleWidthStyles}
`;

const underline = (kickerColor: string): SerializedStyles => css`
	text-decoration: underline;
	text-decoration-thickness: from-font;
	text-decoration-color: ${kickerColor};
	padding-bottom: 0;
`;

const fontStyles = (
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

const interviewStyles = css`
	margin-left: ${remSpace[3]};
	border: 0;
`;

const immersiveStyles = css`
	border: 0;
	margin-left: ${remSpace[2]};
	padding-top: 0.0625rem;
	padding-bottom: ${remSpace[6]};

	${from.tablet} {
		margin-left: 0;
	}
`;

const commentStyles = css`
	padding-bottom: 0;
	padding-right: 6rem;
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

	background-color: ${neutral[0]};
	color: ${neutral[100]};
	white-space: pre-wrap;
	padding-top: 0.0625rem;
	padding-bottom: ${remSpace[1]};
	box-shadow: -${remSpace[3]} 0 0 ${neutral[0]},
		${remSpace[3]} 0 0 ${neutral[0]};
	display: inline;
`;

const galleryStyles = css`
	${titlepiece.small()}
	font-size: 2rem;
	line-height: 1.2;
	padding-bottom: ${remSpace[6]};
	border: 0;
`;

const headlineStyles = css`
	position: relative;
`;

const seriesStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
`;

const getStyles = (format: Format, kickerColor: string): SerializedStyles => {
	if (format.design === Design.Interview) {
		return css(
			styles(format),
			fontStyles('tight', 'bold'),
			interviewStyles,
		);
	}

	if (
		format.design === Design.Review ||
		format.display === Display.Showcase
	) {
		return css(styles(format), fontStyles('tight', 'bold'));
	}

	if (format.display === Display.Immersive) {
		return css(
			styles(format),
			fontStyles('tight', 'bold'),
			immersiveStyles,
		);
	}

	if (format.design === Design.Analysis)
		return css(
			styles(format),
			fontStyles('regular', 'light'),
			underline(kickerColor),
		);

	if (format.design === Design.Comment)
		return css(
			styles(format),
			fontStyles('regular', 'light'),
			commentStyles,
		);

	if (format.design === Design.Media) {
		return css(styles(format), galleryStyles);
	}

	return css(styles(format), fontStyles('tight', 'medium'));
};

const getHeadlineText = (item: Item): JSX.Element | string => {
	const format = getFormat(item);

	if (item.design === Design.Interview) {
		return <span css={interviewFontStyles}>{item.headline}</span>;
	}

	if (item.design === Design.Comment) {
		return (
			<span css={quoteStyles(format)}>
				<SvgQuote />
				{item.headline}
			</span>
		);
	}
	return item.headline;
};

const hasSeries = (format: Format): boolean =>
	format.display === Display.Immersive || format.design === Design.Interview;

const Headline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	return (
		<div css={headlineStyles}>
			{hasSeries(format) && (
				<div css={seriesStyles}>
					<Series item={item} />
				</div>
			)}
			<h1 css={getStyles(format, kickerColor)}>
				{getHeadlineText(item)}
			</h1>
		</div>
	);
};

// ----- Exports ----- //

export default Headline;
