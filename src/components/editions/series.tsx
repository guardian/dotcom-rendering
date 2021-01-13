// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { titlepiece } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import { kickerPicker } from './kickerPicker';

// ----- Component ----- //

const styles = (item: Item): SerializedStyles => {
	const format = getFormat(item);
	const { kicker } = getThemeStyles(format.theme);

	return css`
		${titlepiece.small()}
		color: ${kicker};
		font-size: 1.0625rem;
		padding: ${remSpace[1]} 0 ${remSpace[2]};
	`;
};

interface Props {
	item: Item;
}

const Series: FC<Props> = ({ item }) =>
	maybeRender(kickerPicker(item), (kicker) => (
		<nav css={styles(item)}>{kicker}</nav>
	));

// ----- Exports ----- //

export default Series;
