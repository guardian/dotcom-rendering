// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, remSpace } from '@guardian/src-foundations';
import { between, from } from '@guardian/src-foundations/mq';
import { headline, textSans } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design, Display, Special } from '@guardian/types';
import StarRating from 'components/starRating';
import { border } from 'editorialPalette';
import { headlineBackgroundColour, headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import type { ReactElement } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	wideContentWidth,
} from 'styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const styles = (format: Format): SerializedStyles => css`
	${headline.medium()}
	${headlineTextColour(format)}
    ${headlineBackgroundColour(format)}
    padding-bottom: ${remSpace[6]};
	margin: 0;

	${articleWidthStyles}
`;

const immersiveStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	font-weight: 700;
	padding: ${remSpace[1]} ${remSpace[3]} ${remSpace[6]} ${remSpace[3]};
	margin: calc(80vh - 5rem) 0 0;
	position: relative;
	display: inline-block;
	min-height: 112px;
	box-sizing: border-box;

	${between.phablet.and.wide} {
		width: ${wideContentWidth}px;
	}

	${from.desktop} {
		${headline.xlarge({ fontWeight: 'bold' })}
		margin-top: calc(80vh - 7rem);
	}

	${from.wide} {
		width: 100%;
		margin-left: calc(
			((100% - ${wideContentWidth}px) / 2) - ${remSpace[3]}
		);
		padding-left: ${remSpace[3]};

		span {
			display: block;
			width: ${wideContentWidth}px;
		}
	}
`;

const analysisStyles = (format: Format): SerializedStyles => css`
	${headline.medium({ lineHeight: 'regular', fontWeight: 'light' })}

	span {
		box-shadow: inset 0 -0.025rem ${border.primary(format)};
		padding-bottom: 0.2rem;

		${darkModeCss`
            box-shadow: inset 0 -0.025rem ${neutral[46]};
        `}
	}
`;

const mediaStyles = css`
	${headline.medium({ fontWeight: 'medium' })}
`;

const featureStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
`;

const commentStyles = css`
	${headline.medium({ fontWeight: 'light' })}
	padding-bottom: ${remSpace[1]};
`;

const labsStyles = css`
	${textSans.xxxlarge({ lineHeight: 'regular' })}
`;

const immersiveLabs = css`
	${textSans.xxxlarge({ lineHeight: 'regular', fontWeight: 'bold' })}
	${from.desktop} {
		${textSans.xxxlarge({ lineHeight: 'regular', fontWeight: 'bold' })}
	}
`;

// stop headlines from growing in size with font resizer
const fontSizeRestriction = css`
	font-size: 28px;
	${from.tablet} {
		font-size: 34px;
	}
`;

const liveblogStyles = css`
	padding: 0 0 ${remSpace[5]};
`;

const getStyles = (format: Format): SerializedStyles => {
	if (format.display === Display.Immersive) {
		const labs = format.theme === Special.Labs ? immersiveLabs : null;
		return css(styles(format), immersiveStyles, labs);
	}

	if (format.theme === Special.Labs) {
		return css(styles(format), labsStyles, fontSizeRestriction);
	}

	switch (format.design) {
		case Design.Analysis:
			return css(
				styles(format),
				analysisStyles(format),
				fontSizeRestriction,
			);
		case Design.Feature:
			return css(styles(format), featureStyles, fontSizeRestriction);
		case Design.Editorial:
		case Design.Letter:
		case Design.Comment:
			return css(styles(format), commentStyles, fontSizeRestriction);
		case Design.Media:
			return css(styles(format), mediaStyles, fontSizeRestriction);

		case Design.LiveBlog:
		case Design.DeadBlog:
			return css(styles(format), fontSizeRestriction, liveblogStyles);

		default:
			return css(styles(format), fontSizeRestriction);
	}
};

const Headline = ({ item }: Props): ReactElement => (
	<h1 css={getStyles(item)}>
		<span>{item.headline}</span>
		<StarRating item={item} />
	</h1>
);

// ----- Exports ----- //

export default Headline;
