// ----- Imports ----- //

import { css, SerializedStyles } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { Format } from '@guardian/types';
import { getFormat, Item } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { basePx } from 'styles';
import { getThemeStyles } from 'themeStyles';
import { ShareIcon } from './shareIcon';

// ----- Component ----- //

const styles = css`
	display: flex;
	justify-content: space-between;
	svg {
		flex: 0 0 30px;
		padding: ${basePx(0.5)};
		width: 30px;
		height: 30px;
	}
`;

const bylineBold = (kickerColor: string): SerializedStyles => {
	return css`
		${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
		color: ${kickerColor};
	`;
};

const bylineItalic = css`
	${body.medium({ fontStyle: 'italic' })}
`;

interface Props {
	item: Item;
}

const toReact = (format: Format, kickerColor: string) => (
	node: Node,
	index: number,
): ReactNode => {
	switch (node.nodeName) {
		case 'A':
			return (
				<span css={bylineBold(kickerColor)}>
					{node.textContent ?? ''}
				</span>
			);
		case 'SPAN':
			return Array.from(node.childNodes).map(
				toReact(format, kickerColor),
			);
		case '#text':
			return <span css={bylineItalic}>{node.textContent}</span>;
	}
};

const renderText = (
	format: Format,
	byline: DocumentFragment,
	kickerColor: string,
): ReactNode =>
	Array.from(byline.childNodes).map((node, i) =>
		toReact(format, kickerColor)(node, i),
	);

const Byline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker } = getThemeStyles(format.theme);

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={styles}>
			<address>{renderText(format, byline, kicker)}</address>
			<ShareIcon platform="ios" color={kicker} />
		</div>
	));
};

// ----- Exports ----- //

export default Byline;
