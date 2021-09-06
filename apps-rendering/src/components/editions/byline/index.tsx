// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { neutral, remSpace } from '@guardian/src-foundations';
import type {
	FontStyle,
	FontWeight,
	LineHeight,
} from '@guardian/src-foundations/dist/types/typography/types';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { body, headline } from '@guardian/src-foundations/typography';
import { OptionKind } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { index, maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { getThemeStyles } from 'themeStyles';
import EditionsAvatar from '../avatar';
import ShareIcon from '../shareIcon';
import {
	articleMarginStyles,
	articleWidthStyles,
	borderWidthStyles,
	tabletImmersiveWidth,
	wideImmersiveWidth,
} from '../styles';

// ----- Template Specific Styles ----- //

const interviewStyles = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};

	${from.tablet} {
		box-sizing: border-box;
		padding-left: ${remSpace[3]};
		padding-right: ${remSpace[3]};
		border-right: 1px solid ${border.secondary};
	}

	${articleMarginStyles}
	${borderWidthStyles}
	border-bottom: 1px solid ${border.secondary};
`;

const immersiveStyles = css`
	box-sizing: border-box;
	background-color: ${neutral[7]};

	${from.tablet} {
		width: ${tabletImmersiveWidth}px;
	}

	${from.desktop} {
		width: ${wideImmersiveWidth}px;
	}
`;

const galleryStyles = css`
	${articleWidthStyles}
`;

const showcaseStyles = css`
	padding-bottom: ${remSpace[6]};
`;

const commentStyles = (hasImage: boolean): SerializedStyles => css`
	padding-right: ${hasImage ? '6.5625rem' : 0};
`;

const avatarWrapperStyles = css`
	position: absolute;
	bottom: 0;
	right: 0;
`;

// ----- Byline Component Styles ----- //

const styles = (iconColor: string): SerializedStyles => {
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
				stroke: ${iconColor};
			}

			path {
				fill: ${iconColor};
			}
		}
		min-height: ${remSpace[12]};

		padding-bottom: ${remSpace[4]};
		margin: 0;

		${from.tablet} {
			min-height: ${remSpace[9]};
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
	lineHeight: LineHeight,
): SerializedStyles => css`
	${body.medium({ fontStyle, fontWeight, lineHeight })}
`;

const bylinePrimaryStyles = (format: ArticleFormat): SerializedStyles => {
	const { kicker: kickerColor } = getThemeStyles(format.theme);
	const color = ignoreTextColour(format) ? neutral[100] : kickerColor;

	if (
		format.design === ArticleDesign.Analysis ||
		format.design === ArticleDesign.Comment
	) {
		return css`
			color: ${color};
			${largeTextStyles('normal', 'bold', 'regular')}
		`;
	}

	return css`
		color: ${color};
		${standardTextStyles('normal', 'bold', 'regular')}
	`;
};

const bylineSecondaryStyles = (format: ArticleFormat): SerializedStyles => {
	const color = ignoreTextColour(format) ? neutral[100] : neutral[7];

	if (
		format.design === ArticleDesign.Analysis ||
		format.design === ArticleDesign.Comment
	) {
		return css`
			${largeTextStyles('italic', 'light')};
			color: ${color};
		`;
	}
	return css`
		${standardTextStyles('italic', 'light', 'regular')};
		color: ${color};
	`;
};

const getBylineStyles = (
	format: ArticleFormat,
	iconColor: string,
	hasImage: boolean,
): SerializedStyles => {
	// Display.Immersive needs to come before Design.Interview
	if (format.display === ArticleDisplay.Immersive) {
		return css(styles(iconColor), immersiveStyles);
	}
	if (format.design === ArticleDesign.Interview) {
		return css(styles(iconColor), interviewStyles);
	}
	if (format.design === ArticleDesign.Comment) {
		return css(styles(iconColor), commentStyles(hasImage));
	}
	if (format.display === ArticleDisplay.Showcase) {
		return css(styles(iconColor), showcaseStyles);
	}
	if (format.design === ArticleDesign.Media) {
		return css(styles(iconColor), galleryStyles);
	}
	return styles(iconColor);
};

// ----- Component ----- //

interface Props {
	item: Item;
}

const renderText = (
	byline: DocumentFragment,
	format: ArticleFormat,
): ReactNode =>
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

const hasShareIcon = (format: ArticleFormat): boolean =>
	!(
		format.design === ArticleDesign.Analysis ||
		format.design === ArticleDesign.Comment
	);

const hasAvatar = (item: Item): boolean => {
	return (
		item.design === ArticleDesign.Comment && item.contributors.length > 0
	);
};
const ignoreIconColour = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.Media;

const ignoreTextColour = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.Media ||
	format.display === ArticleDisplay.Immersive;

const Byline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	const iconColor = ignoreIconColour(format) ? neutral[100] : kickerColor;
	const showShareIcon = hasShareIcon(format);
	const contributor = index(0)(item.contributors);

	const hasImage =
		contributor.kind === OptionKind.Some &&
		contributor.value.image.kind === OptionKind.Some;

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={getBylineStyles(format, iconColor, hasImage)}>
			<address>{renderText(byline, format)}</address>
			{showShareIcon && (
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
