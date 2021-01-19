// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { border } from '@guardian/src-foundations/palette';
import { Design, partition } from '@guardian/types';
import type { Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';
import Header from './header';
import { articleWidthStyles, sidePadding } from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const bodyStyles = css`
	border-top: 1px solid ${border.secondary};
	padding-top: ${remSpace[4]};
	${sidePadding}
	${articleWidthStyles}
`;

const Article: FC<Props> = ({ item }) => {
	if (item.design === Design.Live) {
		return <p>Not implemented</p>;
	}

	return (
		<main>
			<article>
				<Header item={item} />
				<section css={bodyStyles}>
					{renderEditionsAll(item, partition(item.body).oks)}
				</section>
			</article>
		</main>
	);
};

// ----- Exports ----- //

export default Article;
