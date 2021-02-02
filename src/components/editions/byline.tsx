// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { body, headline } from '@guardian/src-foundations/typography';
import type {
	FontStyle,
	FontWeight,
	LineHeight,
} from '@guardian/src-foundations/typography/types';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { getThemeStyles } from 'themeStyles';
import EditionsAvatar from './avatar';
import { ShareIcon } from './shareIcon';
import {
	articleWidthStyles,
	borderWidthStyles,
	tabletImmersiveWidth,
	wideArticleMargin,
	wideImmersiveWidth,
} from './styles';

// ----- Styles ----- //

const interviewStyles = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};

	${from.tablet} {
		box-sizing: border-box;
		margin-left: ${remSpace[6]};
		padding-left: ${remSpace[3]};
		padding-right: ${remSpace[3]};
	}

	${from.wide} {
		margin-left: ${wideArticleMargin}px;
	}
	${borderWidthStyles}
	border-bottom: 1px solid ${border.secondary};
	border-right: 1px solid ${border.secondary};
`;

const immersiveStyles = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};
	box-sizing: border-box;

	${from.tablet} {
		padding-left: 0;
		padding-right: ${remSpace[2]};
		margin-left: ${remSpace[6]};
		width: ${tabletImmersiveWidth}px;
	}

	${from.wide} {
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

	${from.wide} {
		${headline.medium({ fontStyle, fontWeight, lineHeight })};
	}
`;

const standardTextStyles = (
	fontStyle: FontStyle,
	fontWeight: FontWeight,
): SerializedStyles => css`
	${body.medium({ fontStyle, fontWeight })}
`;

const bylinePrimaryStyles = (
	kickerColor: string,
	large?: boolean,
): SerializedStyles => {
	if (large) {
		return css`
			color: ${kickerColor};
			${largeTextStyles('normal', 'bold', 'regular')}
		`;
	}

	return css`
		color: ${kickerColor};
		${standardTextStyles('normal', 'bold')}
	`;
};

const bylineSecondaryStyles = (
	kickerColor: string,
	large?: boolean,
): SerializedStyles => css`
	${large
		? largeTextStyles('italic', 'light')
		: standardTextStyles('italic', 'light')}

	color: ${kickerColor === neutral[100] ? neutral[100] : neutral[7]}
`;

const getStyles = (format: Format, kickerColor: string): SerializedStyles => {
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
	shareIcon?: boolean;
	large?: boolean;
	avatar?: boolean;
}

const renderText = (
	byline: DocumentFragment,
	kickerColor: string,
	large?: boolean,
): ReactNode =>
	Array.from(byline.childNodes).map((node) => {
		switch (node.nodeName) {
			case 'A':
				return (
					<span css={bylinePrimaryStyles(kickerColor, large)}>
						{node.textContent ?? ''}
					</span>
				);
			case 'SPAN':
			case '#text':
				return (
					<span css={bylineSecondaryStyles(kickerColor, large)}>
						{node.textContent ?? ''}
					</span>
				);
		}
	});

const Byline: FC<Props> = ({ item, shareIcon, large, avatar }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	const ignoreKickerColour = (format: Format): boolean =>
		format.design === Design.Media || format.display === Display.Immersive;

	const bylineColor = ignoreKickerColour(format) ? neutral[100] : kickerColor;

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={getStyles(format, bylineColor)}>
			<address>{renderText(byline, bylineColor, large)}</address>
			{shareIcon && (
				<span className="js-share-button" role="button">
					<ShareIcon />
				</span>
			)}
			{avatar && (
				<div css={avatarWrapperStyles}>
					<EditionsAvatar item={item} />
				</div>
			)}
		</div>
	));
};

// ----- Exports ----- //

export default Byline;
