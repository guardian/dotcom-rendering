// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { getThemeStyles } from 'themeStyles';
import { ShareIcon } from './shareIcon';
import { articleWidthStyles } from './styles';

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

		padding-bottom: ${remSpace[4]};
		margin: 0;

		${articleWidthStyles}
	`;
};

const bylinePrimaryStyles = (kickerColor: string): SerializedStyles => {
	return css`
		${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
		color: ${kickerColor};
	`;
};

const bylineSecondaryStyles = css`
	${body.medium({ fontStyle: 'italic' })}
`;

// ----- Component ----- //

interface Props {
	item: Item;
}

const renderText = (byline: DocumentFragment, kickerColor: string): ReactNode =>
	Array.from(byline.childNodes).map((node) => {
		switch (node.nodeName) {
			case 'A':
				return (
					<span css={bylinePrimaryStyles(kickerColor)}>
						{node.textContent ?? ''}
					</span>
				);
			case 'SPAN':
			case '#text':
				return (
					<span css={bylineSecondaryStyles}>
						{node.textContent ?? ''}
					</span>
				);
		}
	});

const Byline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={styles(kickerColor)}>
			<address>{renderText(byline, kickerColor)}</address>
			<span className="js-share-button" role="button">
				<ShareIcon />
			</span>
		</div>
	));
};

// ----- Exports ----- //

export default Byline;
