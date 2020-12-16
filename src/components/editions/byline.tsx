// ----- Imports ----- //

import { css, SerializedStyles } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { Format } from '@guardian/types';
import { getFormat, Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import { ShareIcon } from './shareIcon';

// ----- Component ----- //

const styles = (format: Format): SerializedStyles => {
	const { kicker } = getThemeStyles(format.theme);

	return css`
		${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
		color: ${kicker};
	`	;
};

interface Props {
	item: Item;
}

const Byline: FC<Props> = ({ item }) =>
	maybeRender(item.bylineHtml, (byline) => (
		<div css={styles(getFormat(item))}>
			<address>{byline.textContent}</address>
			<ShareIcon platform="ios" />
		</div>
	));

// ----- Exports ----- //

export default Byline;
