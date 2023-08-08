// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { FontWeight, LineHeight } from '@guardian/source-foundations';
import {
	body,
	from,
	headline,
	neutral,
	remSpace,
	text,
} from '@guardian/source-foundations';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import { text as textPalette } from 'palette';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import ShareIcon from '../shareIcon';
import { articleWidthStyles, sidePadding } from '../styles';

// ----- Template ArticleFormat Specific Styles ----- //

const interviewStyles = css`
	${sidePadding}
`;
const galleryStyles = css`
	${body.medium({ lineHeight: 'tight', fontWeight: 'bold' })}
	${from.mobileMedium} {
		${body.medium({ lineHeight: 'tight' })}
	}
	color: ${neutral[100]};
`;

const getFontStyles = (
	fontColor: string,
	lineHeight?: LineHeight,
	fontWeight?: FontWeight,
): SerializedStyles => css`
	${headline.xxxsmall({ lineHeight, fontWeight })}

	${from.mobileMedium} {
		${headline.xxsmall({ lineHeight, fontWeight })}
	}
	color: ${fontColor};
`;
// ----- Headline Component Styles ----- //

const styles = (kickerColor: string): SerializedStyles => css`
	${body.medium({ lineHeight: 'tight' })}
	display: flex;
	justify-content: space-between;
	padding-bottom: ${remSpace[4]};
	color: ${text.primary};

	${articleWidthStyles}

	p,
	ul {
		padding-top: ${remSpace[1]};
		margin: 0;
	}

	address {
		font-style: normal;
	}

	svg {
		flex: 0 0 2.25rem;
		margin-top: 0.375rem;
		padding-left: 0.5rem;
		width: 2.25rem;
		height: 2.25rem;

		circle {
			stroke: ${kickerColor};
		}

		path {
			fill: ${kickerColor};
		}
	}
`;

const textContainerStyles = css`
	display: flex;
	flex-direction: column;
`;

const getStyles = (format: ArticleFormat): SerializedStyles => {
	const kickerColor = textPalette.editionsKicker(format);

	// ArticleDisplay.Immersive needs to come before ArticleDesign.Interview
	if (format.display === ArticleDisplay.Immersive) {
		return css(
			styles(kickerColor),
			getFontStyles(neutral[100], 'tight', 'bold'),
		);
	}
	if (format.design === ArticleDesign.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}
	if (
		format.design === ArticleDesign.Analysis ||
		format.design === ArticleDesign.Letter
	) {
		return css(
			styles(kickerColor),
			getFontStyles(neutral[46], 'tight', 'bold'),
		);
	}
	if (
		format.design === ArticleDesign.Comment ||
		format.display === ArticleDisplay.Showcase
	) {
		return css(styles(kickerColor), getFontStyles(neutral[20], 'tight'));
	}

	if (
		format.design === ArticleDesign.Gallery ||
		format.design === ArticleDesign.Audio ||
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Picture
	) {
		return css(styles(kickerColor), galleryStyles);
	}
	return styles(kickerColor);
};

// ----- Component ----- //
interface Props {
	item: Item;
	shareIcon?: boolean;
}

const isEditions = true;

const Standfirst: FC<Props> = ({ item, shareIcon }) => {
	return maybeRender(item.standfirst.toOption(), (standfirst) => (
		<div css={getStyles(item)}>
			<div css={textContainerStyles}>
				{renderStandfirstText(standfirst, item, isEditions)}
			</div>
			{shareIcon && <ShareIcon />}
		</div>
	));
};

// ----- Exports ----- //

export default Standfirst;
