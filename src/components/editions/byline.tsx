// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body, headline } from '@guardian/src-foundations/typography';
import type {
	FontStyle,
	FontWeight,
} from '@guardian/src-foundations/typography/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { getThemeStyles } from 'themeStyles';
import { ShareIcon } from './shareIcon';
import { articleWidthStyles, sidePadding } from './styles';
import { Design, Format } from '@guardian/types';

// ----- Component ----- //

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

		padding-bottom: ${remSpace[6]};
		margin: 0;

		${articleWidthStyles}
	`;
};

const largeTextStyles = (
	fontStyle: FontStyle,
	fontWeight: FontWeight,
): SerializedStyles => css`
	${headline.xsmall({ fontStyle, fontWeight })};

	${from.tablet} {
		${headline.small({ fontStyle, fontWeight })};
	}

	${from.wide} {
		${headline.medium({ fontStyle, fontWeight })};
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
			${largeTextStyles('normal', 'bold')}
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

const interviewStyles = css`
	${sidePadding}
`;
const getStyles = (format: Format, kickerColor: string): SerializedStyles => {
	if (format.design === Design.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}
	return styles(kickerColor);
};
const Byline: FC<Props> = ({ item, shareIcon, large }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={getStyles(item, kickerColor)}>
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
