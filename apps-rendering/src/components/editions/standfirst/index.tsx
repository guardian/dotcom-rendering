// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { neutral, remSpace, text } from '@guardian/src-foundations';
import type {
	FontWeight,
	LineHeight,
} from '@guardian/src-foundations/dist/types/typography/types';
import { from } from '@guardian/src-foundations/mq';
import { body, headline } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { getThemeStyles } from 'themeStyles';
import ShareIcon from '../shareIcon';
import { articleWidthStyles, sidePadding } from '../styles';

// ----- Template Format Specific Styles ----- //

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
		flex: 0 0 1.875rem;
		margin-top: 0.375rem;
		padding-left: 0.5rem;
		width: 1.875rem;
		height: 1.875rem;

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
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	// Display.Immersive needs to come before Design.Interview
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

	if (format.design === ArticleDesign.Media) {
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
	return maybeRender(item.standfirst, (standfirst) => (
		<div css={getStyles(item)}>
			<div css={textContainerStyles}>
				{renderStandfirstText(standfirst, item, isEditions)}
			</div>
			{shareIcon && (
				<span className="js-share-button" role="button">
					<ShareIcon />
				</span>
			)}
		</div>
	));
};

// ----- Exports ----- //

export default Standfirst;
