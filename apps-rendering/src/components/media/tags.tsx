import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, remSpace, textSans17 } from '@guardian/source/foundations';
import type { FC } from 'react';

const tagsStyles = (background: string = neutral[20]): SerializedStyles => css`
	margin-top: 0;
	margin-bottom: 0;

	display: block;
	list-style: none;
	padding: ${remSpace[3]} 0 ${remSpace[3]} 0;
	${textSans17}

	li {
		margin: ${remSpace[3]} ${remSpace[3]} ${remSpace[1]} 0;
		display: inline-block;
		padding: ${remSpace[1]} 0;

		a {
			text-decoration: none;
			white-space: nowrap;
			padding: ${remSpace[3]} ${remSpace[3]};
			border-radius: 30px;
			text-overflow: ellipsis;
			max-width: 18.75rem;
			color: ${neutral[60]};
			background-color: ${background};
		}
	}
`;

interface TagsProps {
	tags: Array<{
		webUrl: string;
		webTitle: string;
	}>;
	background?: string;
}

const Tags: FC<TagsProps> = ({ tags, background }) => (
	<ul css={tagsStyles(background)} role="list">
		{tags.map((tag, index) => {
			return (
				<li key={index}>
					<a href={tag.webUrl}>{tag.webTitle}</a>
				</li>
			);
		})}
	</ul>
);

export default Tags;
