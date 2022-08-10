// ----- Imports ----- //

import { css } from '@emotion/react';
import { from, neutral, remSpace, until } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { none } from '@guardian/types';
import BylineCard from 'components/BylineCard';
import Card from 'components/Card';
import { grid } from 'grid/grid';
import type { ResizedRelatedContent } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import {
	COMMENT,
	defaultHeadingStyles,
	defaultListStyles,
} from './RelatedContent.defaults';

// ----- Component ----- //

const styles = css`
	${grid.container}
	background-color: ${neutral[97]};
`;

const relatedContentStyles = css`
	${grid.column.centre}
	grid-row: 2;
	border: 0;
	position: relative;
	padding-top: ${remSpace[3]};
	padding-bottom: ${remSpace[3]};

	${until.wide} {
		padding-left: 0;
		padding-right: 0;
	}

	${from.leftCol} {
		grid-row: 1;
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const headingStyles = css`
	${grid.column.centre}
	padding: ${remSpace[3]};
	margin: 0;

	${from.leftCol} {
		${grid.column.left}
		position: relative;
		grid-row: 1;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		border-left: 1px solid ${neutral[86]};
		right: -10px;
	}
`;

type Props = {
	content: Option<ResizedRelatedContent>;
};

const GalleryRelatedContent: FC<Props> = ({ content }) =>
	maybeRender(content, ({ title, relatedItems, resizedImages }) => {
		if (relatedItems.length === 0) {
			return null;
		}

		return (
			<aside css={styles}>
				<h2 css={css(defaultHeadingStyles, headingStyles)}>{title}</h2>

				<ul
					css={css(defaultListStyles, relatedContentStyles)}
					role="list"
				>
					{relatedItems.map((relatedItem, key) => {
						return relatedItem.type === COMMENT &&
							relatedItem.bylineImage ? (
							<BylineCard key={key} relatedItem={relatedItem} />
						) : (
							<Card
								key={key}
								relatedItem={relatedItem}
								image={resizedImages[key]}
								kickerText={none}
							/>
						);
					})}
				</ul>
			</aside>
		);
	});

// ----- Exports ----- //

export default GalleryRelatedContent;
