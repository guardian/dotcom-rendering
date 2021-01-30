// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
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
	tabletArticleMargin,
	wideArticleMargin,
} from './styles';

// ----- Styles ----- //

const interviewStyles = css`
	margin-left: ${remSpace[2]};
	margin-right: ${remSpace[2]};

	${from.tablet} {
		margin-left: ${tabletArticleMargin}px;
	}

	${from.wide} {
		margin-left: ${wideArticleMargin}px;
	}
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

const bylineSecondaryStyles = (large?: boolean): SerializedStyles => css`
	${large
		? largeTextStyles('italic', 'light')
		: standardTextStyles('italic', 'light')}
`;

const getStyles = (format: Format, kickerColor: string): SerializedStyles => {
	if (format.design === Design.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}

	if (format.design === Design.Comment) {
		return css(styles(kickerColor), commentStyles);
	}

	if (format.display === Display.Showcase) {
		return css(styles(kickerColor), showcaseStyles);
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
					<span css={bylineSecondaryStyles(large)}>
						{node.textContent ?? ''}
					</span>
				);
		}
	});

const Byline: FC<Props> = ({ item, shareIcon, large, avatar }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	const bylineColor =
		format.design === Design.Media ? neutral[100] : kickerColor;

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
