// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { background, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design } from '@guardian/types';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const backgroundColour = (format: Format): string => {
	switch (format.design) {
		case Design.Editorial:
		case Design.Letter:
		case Design.Comment:
			return neutral[86];
		case Design.LiveBlog:
			return neutral[93];
		default:
			return neutral[97];
	}
};

const styles = css`
	margin-top: 0;
	margin-bottom: 0;
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	padding: ${remSpace[3]} 0 ${remSpace[2]} 0;
	${textSans.medium()}

	${darkModeCss`
		background: ${background.inverse};
		color: ${neutral[86]};
	`}
`;

const tagStyles = css`
	margin-right: 1rem;
	margin-bottom: 1rem;
	line-height: 0;
`;

const anchorStyles = (format: Format): SerializedStyles => css`
	text-decoration: none;
	white-space: nowrap;
	padding: 6px 16px;
	border-radius: 30px;
	text-overflow: ellipsis;
	max-width: 18.75rem;
	color: ${neutral[7]};
	background-color: ${backgroundColour(format)};
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	line-height: 1;

	${darkModeCss`
		color: ${neutral[60]};
		background-color: ${neutral[20]};
	`};
`;

interface Props {
	tags: Array<{
		webUrl: string;
		webTitle: string;
	}>;
	background?: string;
	format: Format;
}

const Tags: FC<Props> = ({ tags, format }) => (
	<ul css={styles}>
		{tags.map((tag, index) => {
			return (
				<li key={index} css={tagStyles}>
					<a href={tag.webUrl} css={anchorStyles(format)}>
						{tag.webTitle}
					</a>
				</li>
			);
		})}
	</ul>
);

// ----- Exports ----- //

export default Tags;
