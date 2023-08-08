// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type {
	FontStyle,
	FontWeight,
	LineHeight,
} from '@guardian/source-foundations';
import {
	body,
	border,
	from,
	headline,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import { text } from 'palette';
import type { FC, ReactNode } from 'react';
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

const avatarWrapperStyles = css`
	margin-top: -16px;
`;

const addressStyles = css`
	flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 50%;
`;

// ----- Byline Component Styles ----- //

const styles = (
	iconColor: string,
	hasAvatar: boolean,
	shareIcon: boolean,
): SerializedStyles => {
	return css`
		position: relative;
		display: flex;
		justify-content: space-between;
		font-style: italic;
		svg {
			flex: 0 0 2.25rem;
			padding-top: 0.375rem;
			width: 2.25rem;
			height: 2.25rem;

			circle {
				stroke: ${iconColor};
			}

			path {
				fill: ${iconColor};
			}
		}
		min-height: ${remSpace[12]};

		${!hasAvatar && shareIcon && `padding-bottom: ${remSpace[4]};`}
		margin: 0;

		${from.tablet} {
			min-height: ${remSpace[9]};
			${!hasAvatar && shareIcon && `padding-bottom: ${remSpace[9]};`}
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
	const kickerColor = text.editionsKicker(format);
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
	hasAvatar: boolean,
	shareIcon: boolean,
): SerializedStyles => {
	// ArticleDisplay.Immersive needs to come before ArticleDesign.Interview
	if (format.display === ArticleDisplay.Immersive) {
		return css(styles(iconColor, hasAvatar, shareIcon), immersiveStyles);
	}
	if (format.design === ArticleDesign.Interview) {
		return css(styles(iconColor, hasAvatar, shareIcon), interviewStyles);
	}
	if (format.design === ArticleDesign.Comment) {
		return css(styles(iconColor, hasAvatar, shareIcon));
	}
	if (format.display === ArticleDisplay.Showcase) {
		return css(styles(iconColor, hasAvatar, shareIcon), showcaseStyles);
	}
	if (
		format.design === ArticleDesign.Gallery ||
		format.design === ArticleDesign.Audio ||
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Picture
	) {
		return css(styles(iconColor, hasAvatar, shareIcon), galleryStyles);
	}
	return styles(iconColor, hasAvatar, shareIcon);
};

// ----- Component ----- //

interface Props {
	item: Item;
	shareIcon?: boolean;
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

const hasAvatar = (format: Item): boolean => {
	return (
		format.design === ArticleDesign.Comment &&
		format.contributors.length > 0
	);
};
const ignoreIconColour = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.Gallery ||
	format.design === ArticleDesign.Audio ||
	format.design === ArticleDesign.Video ||
	format.design === ArticleDesign.Picture;

const ignoreTextColour = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.Gallery ||
	format.design === ArticleDesign.Audio ||
	format.design === ArticleDesign.Video ||
	format.design === ArticleDesign.Picture ||
	format.display === ArticleDisplay.Immersive;

const Byline: FC<Props> = ({ item, shareIcon = true }) => {
	const format = getFormat(item);
	const kickerColor = text.editionsKicker(format);

	const iconColor = ignoreIconColour(format) ? neutral[100] : kickerColor;
	const showShareIcon = hasShareIcon(format) && shareIcon;

	return maybeRender(item.bylineHtml, (byline) => (
		<div
			css={getBylineStyles(format, iconColor, hasAvatar(item), shareIcon)}
		>
			<address css={addressStyles}>{renderText(byline, format)}</address>
			{showShareIcon && <ShareIcon />}
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
