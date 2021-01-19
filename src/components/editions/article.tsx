// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, Display, partition } from '@guardian/types';
import type { Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';
import Header from './header';
import { editionsArticleWidth } from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const bodyStyles = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};
	border-top: 1px solid ${border.secondary};
	padding-top: ${remSpace[4]};

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		width: ${editionsArticleWidth}rem;
	}

	${from.desktop} {
		margin-left: ${remSpace[24]};
	}
`;
const showcaseBodyStyles = css`
	${from.phablet} {
		padding-left: 0;
		padding-right: 0;
		margin-left: ${remSpace[24]};
	}
`;

const getStyles = (format: Format): SerializedStyles | SerializedStyles[] => {
	if (format.display === Display.Showcase) {
		return [bodyStyles, showcaseBodyStyles];
	}

	return bodyStyles;
};

const Article: FC<Props> = ({ item }) => {
	if (item.design === Design.Live) {
		return <p>Not implemented</p>;
	}

	return (
		<main>
			<article>
				<Header item={item} />
				<section css={getStyles(item)}>
					{renderEditionsAll(item, partition(item.body).oks)}
				</section>
			</article>
		</main>
	);
};

// ----- Exports ----- //

export default Article;
