// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, remSpace } from '@guardian/src-foundations';
import type {
	FontStyle,
	FontWeight,
	LineHeight,
} from '@guardian/src-foundations/dist/types/typography/types';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { body, headline } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { getThemeStyles } from 'themeStyles';
import EditionsAvatar from '../avatar';
import ShareIcon from '../shareIcon';
import {
	articleWidthStyles,
	borderWidthStyles,
	tabletImmersiveWidth,
	wideArticleMargin,
	wideImmersiveWidth,
} from '../styles';

// ----- Template Specific Styles ----- //

const interviewStyles = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};

	${from.tablet} {
		box-sizing: border-box;
		margin-left: ${remSpace[6]};
		padding-left: ${remSpace[3]};
		padding-right: ${remSpace[3]};
		border-right: 1px solid ${border.secondary};
	}

	${from.desktop} {
		margin-left: ${wideArticleMargin}px;
	}
	${borderWidthStyles}
	border-bottom: 1px solid ${border.secondary};
`;

const immersiveStyles = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};
	box-sizing: border-box;
	background-color: ${neutral[7]};

	${from.tablet} {
		padding-left: 0;
		padding-right: ${remSpace[3]};
		margin-left: ${remSpace[6]};
		width: ${tabletImmersiveWidth}px;
	}

	${from.desktop} {
		margin-left: ${wideArticleMargin}px;
		width: ${wideImmersiveWidth}px;
	}
`;

const galleryStyles = css`
	${articleWidthStyles}
`;

const showcaseStyles = css`
	padding-bottom: ${remSpace[6]};
`;

const commentStyles = css`
	padding-right: 6.5625rem;
`;

const avatarWrapperStyles = css`
	position: absolute;
	bottom: 0;
	right: 0;
`;

// ----- Byline Component Styles ----- //

const styles = (kickerColor: string): SerializedStyles => {
	return css`
		position: relative;
		display: flex;
		justify-content: space-between;
		svg {
			flex: 0 0 1.875rem;
			padding-top: 0.375rem;
			width: 1.875rem;
			height: 1.875rem;

			circle {
				stroke: ${kickerColor};
			}

			path {
				fill: ${kickerColor};
			}
		}

		padding-bottom: ${remSpace[4]};
		margin: 0;

		${from.tablet} {
			padding-bottom: ${remSpace[9]};
		}
	`;
};

const largeTextStyles = (
	fontStyle: FontStyle,
	fontWeight: FontWeight,
	lineHeight?: LineHeight,
): SerializedStyles => css`
	${headline.xsmall({ fontStyle, fontWeight, lineHeight })};

	${from.tablet} {
		${headline.small({ fontStyle, fontWeight, lineHeight })};
	}

	${from.desktop} {
		${headline.medium({ fontStyle, fontWeight, lineHeight })};
	}
`;

const standardTextStyles = (
	fontStyle: FontStyle,
	fontWeight: FontWeight,
): SerializedStyles => css`
	${body.medium({ fontStyle, fontWeight })}
`;

const bylinePrimaryStyles = (format: Format): SerializedStyles => {
	const { kicker: kickerColor } = getThemeStyles(format.theme);
	const color = ignoreKickerColour(format) ? neutral[100] : kickerColor;

	if (format.design === Design.Analysis || format.design === Design.Comment) {
		return css`
			color: ${color};
			${largeTextStyles('normal', 'bold', 'regular')}
		`;
	}

	return css`
		color: ${color};
		${standardTextStyles('normal', 'bold')}
	`;
};

const bylineSecondaryStyles = (format: Format): SerializedStyles => {
	const color = ignoreKickerColour(format) ? neutral[100] : neutral[7];

	if (format.design === Design.Analysis || format.design === Design.Comment) {
		return css`
			${largeTextStyles('italic', 'light')};
			color: ${color};
		`;
	}
	return css`
		${standardTextStyles('italic', 'light')};
		color: ${color};
	`;
};

const getBylineStyles = (
	format: Format,
	kickerColor: string,
): SerializedStyles => {
	// Display.Immersive needs to come before Design.Interview
	if (format.display === Display.Immersive) {
		return css(styles(kickerColor), immersiveStyles);
	}
	if (format.design === Design.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}
	if (format.design === Design.Comment) {
		return css(styles(kickerColor), commentStyles);
	}
	if (format.display === Display.Showcase) {
		return css(styles(kickerColor), showcaseStyles);
	}
	if (format.design === Design.Media) {
		return css(styles(kickerColor), galleryStyles);
	}
	return styles(kickerColor);
};

// ----- Component ----- //

interface Props {
	item: Item;
}

const renderText = (byline: DocumentFragment, format: Format): ReactNode =>
	Array.from(byline.childNodes).map((node) => {
		switch (node.nodeName) {
			case 'A':
				return (
					<span css={bylinePrimaryStyles(format)}>
						{node.textContent ?? ''}
					</span>
				);
			case 'SPAN':
			case '#text':
				return (
					<span css={bylineSecondaryStyles(format)}>
						{node.textContent ?? ''}
					</span>
				);
		}
	});

const hasShareIcon = (format: Format): boolean =>
	!(format.design === Design.Analysis || format.design === Design.Comment);

const hasAvatar = (item: Item): boolean => {
	return item.design === Design.Comment && item.contributors.length > 0;
};
const ignoreKickerColour = (format: Format): boolean =>
	format.design === Design.Media || format.display === Display.Immersive;

const Byline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	const bylineColor = ignoreKickerColour(format) ? neutral[100] : kickerColor;

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={getBylineStyles(format, bylineColor)}>
			<address>{renderText(byline, format)}</address>
			{hasShareIcon(format) && (
				<span className="js-share-button" role="button">
					<ShareIcon />
				</span>
			)}
			{hasAvatar(item) && (
				<div css={avatarWrapperStyles}>
					<EditionsAvatar item={item} />
				</div>
			)}
		</div>
	));
};

// ----- Exports ----- //

export default Byline;
