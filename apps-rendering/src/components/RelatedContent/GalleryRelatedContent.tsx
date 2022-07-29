// ----- Imports ----- //

import { css } from '@emotion/react';
import { from, neutral, remSpace, until } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { map, none, withDefault } from '@guardian/types';
import BylineCard from 'components/BylineCard';
import Card from 'components/Card';
import { grid } from 'grid/grid';
import type { ResizedRelatedContent } from 'item';
import { pipe } from 'lib';
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

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${neutral[86]};
			left: 0;
			transform: translateX(-10px);
		}
	}
`;

const headingStyles = css`
	${grid.column.centre}
	padding: ${remSpace[3]};

	${from.leftCol} {
		${grid.column.left}
		position: relative;
		grid-row: 1;
	}
`;

type Props = {
	content: Option<ResizedRelatedContent>;
};

const GalleryRelatedContent: FC<Props> = ({ content }) => (
	<div>
		<aside css={styles}>
			{pipe(
				content,
				map(({ title, relatedItems, resizedImages }) => {
					if (relatedItems.length === 0) {
						return null;
					}

					return (
						<>
							<section css={headingStyles}>
								<h2 css={defaultHeadingStyles}>{title}</h2>
							</section>
							<section css={css(relatedContentStyles)}>
								<ul css={defaultListStyles} role="list">
									{relatedItems.map((relatedItem, key) => {
										return relatedItem.type === COMMENT &&
											relatedItem.bylineImage ? (
											<BylineCard
												key={key}
												relatedItem={relatedItem}
											/>
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
							</section>
						</>
					);
				}),
				withDefault<JSX.Element | null>(null),
			)}
		</aside>
	</div>
);

// ----- Exports ----- //

export default GalleryRelatedContent;
