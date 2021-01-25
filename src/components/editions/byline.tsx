// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
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
import { ShareIcon } from './shareIcon';
import { articleWidthStyles, sidePadding } from './styles';

// ----- Styles ----- //

const interviewStyles = css`
	${sidePadding}
`;

const showcaseStyles = css`
	padding-bottom: ${remSpace[6]};
`;

const styles = (kickerColor: string): SerializedStyles => {
	return css`
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

		${articleWidthStyles}
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

const Byline: FC<Props> = ({ item, shareIcon, large }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={getStyles(format, kickerColor)}>
			<address>{renderText(byline, kickerColor, large)}</address>
			{shareIcon && (
				<span className="js-share-button" role="button">
					<ShareIcon />
				</span>
			)}
		</div>
	));
};

// ----- Exports ----- //

export default Byline;
