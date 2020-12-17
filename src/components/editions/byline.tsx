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

const styles = (kicker: string): SerializedStyles => {
	return css`
		${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
		color: ${kicker};

		svg {
			width: 30px;
			height: 30px;
		}
	`;
};

interface Props {
	item: Item;
}

const Byline: FC<Props> = ({ item })  => {
	const format = getFormat(item);
	const { kicker } = getThemeStyles(format.theme);

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={styles(kicker)}>
			<address>{byline.textContent}</address>
			<ShareIcon platform="android" color={kicker} />
		</div>
	));
};

// ----- Exports ----- //

export default Byline;
