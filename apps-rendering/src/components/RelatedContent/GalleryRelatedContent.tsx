// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, remSpace, until } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { none } from '../../../vendor/@guardian/types/index';
import BylineCard from 'components/BylineCard';
import Card from 'components/Card';
import { grid } from 'grid/grid';
import type { ResizedRelatedContent } from 'item';
import { maybeRender } from 'lib';
import { background, border } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import {
	COMMENT,
	defaultHeadingStyles,
	defaultListStyles,
} from './RelatedContent.defaults';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${background.onwardContent(format)};

	${darkModeCss`
		background-color: ${background.onwardContentDark(format)};
	`}
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

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}

	${from.leftCol} {
		grid-row: 1;
	}
`;

const headingStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	padding: ${remSpace[3]};
	margin: 0;

	${from.leftCol} {
		${grid.column.left}
		position: relative;
		grid-row: 1;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${neutral[86]};
			right: -10px;
		}
	}

	${darkModeCss`
		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${border.galleryImage(format)};
			left: -10px;
		}

		&::after {
			border-color: ${border.galleryImage(format)}
		}
	`}
`;

type Props = {
	content: Option<ResizedRelatedContent>;
	format: ArticleFormat;
};

const GalleryRelatedContent: FC<Props> = ({ content, format }) =>
	maybeRender(content, ({ title, relatedItems, resizedImages }) => {
		if (relatedItems.length === 0) {
			return null;
		}

		return (
			<aside css={styles(format)}>
				<h2 css={css(defaultHeadingStyles, headingStyles(format))}>
					{title}
				</h2>

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
