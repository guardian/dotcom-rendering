// ----- Imports ----- //

import { css } from '@emotion/core';
import { Lines } from '@guardian/src-ed-lines';
import { remSpace } from '@guardian/src-foundations';
import { border } from '@guardian/src-foundations/palette';
import { Design, partition } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';

// ----- Component ----- //

interface Props {
	item: Item;
}

const headerStyles = css`
	margin: 0 ${remSpace[3]} ${remSpace[4]};
`;

const bodyStyles = css`
	border-top: 1px solid ${border.secondary};
	padding: 0 ${remSpace[4]};
`;

const Article: FC<Props> = ({ item }) => {
	if (item.design === Design.Live) {
		return <p>Not implemented</p>;
	}

	return (
		<main>
			<article>
				<header css={headerStyles}>
					<HeaderImage item={item} />
					<Series item={item} />
					<Headline item={item} />
					<Standfirst item={item} />
					<Lines />
					<Byline item={item} />
				</header>
				<section css={bodyStyles}>
					{renderEditionsAll(item, partition(item.body).oks)}
				</section>
			</article>
		</main>
	);
};

// ----- Exports ----- //

export default Article;
