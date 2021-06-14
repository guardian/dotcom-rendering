import { css } from '@emotion/react';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import BylineCard from 'components/shared/bylineCard';
import Card from 'components/shared/card';
import type { ResizedRelatedContent } from 'item';
import { pipe } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	content: Option<ResizedRelatedContent>;
}

const headingStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })}
	margin: 0 0 ${remSpace[4]} 0;

	${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const listStyles = css`
	list-style: none;
	display: flex;
	flex-direction: row;
	margin: 0;
	padding: 0;
	overflow-x: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	.js-android & {
		display: grid;
		column-gap: ${remSpace[3]};
		grid-template-columns: repeat(2, minmax(auto, 15rem));
		li {
			margin-right: 0;
		}
		li:nth-child(n + 3) {
			display: none;
		}
		${from.tablet} {
			grid-template-columns: repeat(4, minmax(auto, 15rem));
			li:nth-child(n + 3) {
				display: flex;
			}
		}
	}
`;

const COMMENT = RelatedItemType.COMMENT;

const RelatedContent: FC<Props> = ({ content }) => {
	return pipe(
		content,
		map(({ title, relatedItems, resizedImages }) => {
			if (relatedItems.length === 0) {
				return null;
			}

			return (
				<section>
					<h2 css={headingStyles}>{title}</h2>
					<ul css={listStyles}>
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
								/>
							);
						})}
					</ul>
				</section>
			);
		}),
		withDefault<JSX.Element | null>(null),
	);
};

export default RelatedContent;
