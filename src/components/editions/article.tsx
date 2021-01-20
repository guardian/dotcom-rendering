// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { background, border } from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, partition } from '@guardian/types';
import type { Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';
import Header from './header';
import {
	articleMarginStyles,
	articleWidthStyles,
	headerBackgroundColour,
	sidePadding,
} from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const articleStyles = css`
	${articleMarginStyles}
`;

const headerStyles = css`
	${articleWidthStyles}
	border-bottom: 1px solid ${border.secondary};

	${from.phablet} {
		padding-right: ${remSpace[3]};
		border-right: 1px solid ${border.secondary};
	}
`;

const bodyStyles = css`
	padding-top: ${remSpace[4]};

	figcaption {
		background: ${background.primary};
		padding-bottom: ${remSpace[2]};
	}

	${from.phablet} {
		p {
			margin: 0;
			padding-top: ${remSpace[2]};
			padding-bottom: ${remSpace[2]};
		}
	}

	${sidePadding}
`;

const bodyWrapperStyles = css`
	padding-right: ${remSpace[3]};
	border-right: 1px solid ${border.secondary};
	${articleWidthStyles}
`;

const headerBackgroundStyles = (item: Format): SerializedStyles => css`
	background-color: ${headerBackgroundColour(item)};
`;

const Article: FC<Props> = ({ item }) => {
	if (item.design === Design.Live) {
		return <p>Not implemented</p>;
	}

	return (
		<main>
			<article>
				<div css={headerBackgroundStyles(item)}>
					<section css={[headerStyles, articleStyles]}>
						<Header item={item} />
					</section>
				</div>
				<div css={[bodyWrapperStyles, articleStyles]}>
					<section css={bodyStyles}>
						{renderEditionsAll(item, partition(item.body).oks)}
					</section>
				</div>
			</article>
		</main>
	);
};

// ----- Exports ----- //

export default Article;
