// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	margin-top: 0;
	margin-bottom: 0;
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	padding: ${remSpace[3]} 0 ${remSpace[2]} 0;
	${textSans.medium()}

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};
		color: ${neutral[86]};
	`}
`;

const tagStyles = css`
	margin-right: 1rem;
	margin-bottom: 1rem;
	line-height: 0;
`;

const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
	text-decoration: none;
	white-space: nowrap;
	padding: 6px 16px;
	border-radius: 30px;
	text-overflow: ellipsis;
	max-width: 18.75rem;
	color: ${text.tag(format)};
	background-color: ${background.tag(format)};
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	line-height: 1;

	${darkModeCss`
		color: ${text.tagDark(format)};
		background-color: ${background.tagDark(format)};
	`};
`;

interface Props {
	item: Item;
	css: SerializedStyles;
	className?: string;
}

const DefaultTags: FC<Props> = ({ item, className }) => (
	<ul css={className} role="list">
		{item.tags
			.filter(
				(tag) =>
					tag.type !== TagType.CAMPAIGN &&
					tag.type !== TagType.TRACKING,
			)
			.map((tag, index) => (
				<li key={index} css={tagStyles}>
					<a href={tag.webUrl} css={anchorStyles(getFormat(item))}>
						{tag.webTitle}
					</a>
				</li>
			))}
	</ul>
);

// ----- Exports ----- //

export { DefaultTags, defaultStyles };
