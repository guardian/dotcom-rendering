// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { Design, partition } from '@guardian/types';
import type { Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';
import { wideContentWidth } from 'styles';
import Header from './header';

// ----- Component ----- //

interface Props {
	item: Item;
}

const bodyStyles = css`
	border-top: 1px solid ${border.secondary};
	padding-top: ${remSpace[4]};

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		margin-left: ${remSpace[24]};
		width: ${wideContentWidth}px;
	}
`;

const Article: FC<Props> = ({ item }) => {
	if (item.design === Design.Live) {
		return <p>Not implemented</p>;
	}

	return (
		<main>
			<article>
				<Header item={item} />
				<section css={[bodyStyles]}>
					{renderEditionsAll(item, partition(item.body).oks)}
				</section>
			</article>
		</main>
	);
};

// ----- Exports ----- //

export default Article;
