// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { ArticleDesign } from '@guardian/libs';
import {
	from,
	headline,
	neutral,
	remSpace,
	until,
} from '@guardian/source-foundations';
import { Option, OptionKind } from '@guardian/types';
import { map, none, withDefault, andThen } from '@guardian/types';
import BylineCard from 'components/BylineCard';
import Card from 'components/Card';
import { Image } from 'image';
// import type { ResizedRelatedContent } from 'item';
import { pipe } from 'lib';
import type { FC } from 'react';
import {
	getContributorImage,
	RelatedContent,
	RelatedItem,
} from 'relatedContent';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	content: Option<RelatedContent>;
	css: SerializedStyles;
	className?: string;
}

export const defaultHeadingStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })}
	margin: 0 0 ${remSpace[4]} 0;

	${darkModeCss`
        color: ${neutral[86]};
    `}
`;

export const defaultListStyles = css`
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
		li {
			flex: 1 1 50%;
			max-width: initial;
		}
		li:nth-child(n + 3) {
			display: none;
		}
		li {
			margin-right: 0;
			margin-left: ${remSpace[2]};
		}

		li:first-of-type {
			margin-left: 0;
		}

		${from.mobileLandscape} {
			li {
				flex: 1 1 33.33%;
			}
			li:nth-child(3) {
				display: flex;
			}
		}
		${from.tablet} {
			li {
				flex: 0 0 10rem;
			}
			li:nth-child(n + 3) {
				display: flex;
			}
			li:nth-child(n + 2) {
				margin-left: ${remSpace[5]};
			}
		}
		${from.desktop} {
			li {
				flex: 0 0 13.75rem;
			}
		}
	}
`;

const defaultStyles = css`
	border-top: 1px solid ${neutral[46]};
	padding-top: ${remSpace[3]};

	${until.wide} {
		padding-left: ${remSpace[4]};
		padding-right: ${remSpace[4]};
	}

	${darkModeCss`
		background: ${neutral[0]};
	`}
`;

export const COMMENT = RelatedItemType.COMMENT;

const DefaultRelatedContent: FC<Props> = ({ content, className }) => {
	return pipe(
		content,
		map(({ category, content }) => {
			if (content.length === 0) {
				return null;
			}

			return (
				<section css={className}>
					<h2 css={defaultHeadingStyles}>{category.toString()}</h2>
					<ul css={defaultListStyles} role="list">
						{content.map((relatedItem, key) => {
							const contributorImage = getContributorImage(
								relatedItem.contributor,
							);

							return relatedItem.design ===
								ArticleDesign.Comment &&
								contributorImage.kind === OptionKind.Some ? (
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
			);
		}),
		withDefault<JSX.Element | null>(null),
	);
};

// ----- Exports ----- //

export { defaultStyles };

export default DefaultRelatedContent;
