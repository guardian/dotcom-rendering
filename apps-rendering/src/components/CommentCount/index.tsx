// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { from, remSpace, textSans } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import { border, fill, text } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props extends ArticleFormat {
	count: Option<number>;
	commentable: boolean;
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.medium({ fontWeight: 'bold' })}
	border: none;
	background: none;
	border-left: 1px solid ${fill.lines(format)};
	display: flex;
	flex-direction: column;
	align-items: center;
	height: auto;
	padding-top: ${remSpace[3]};
	padding-left: ${remSpace[3]};
	padding-right: 0;
	gap: ${remSpace[1]};

	color: ${text.commentCount(format)};
	${darkModeCss`
		color: ${text.commentCountDark(format)};
	    border-left: 1px solid ${fill.linesDark(format)};
		${from.desktop} {
        	border-left: 1px solid ${fill.linesDark(format)};
		}
    `}
`;

const bubbleStyles = (format: ArticleFormat): SerializedStyles => css`
	width: 1rem;
	display: block;
	fill: ${fill.commentCount(format)};
	${darkModeCss`
		fill: ${fill.commentCountDark(format)};
    `}
`;

const blogStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.medium({ fontWeight: 'bold' })}
	border: none;
	background: none;
	color: ${text.commentCount(format)};
	border-left: 1px solid ${border.commentCount(format)};

	${from.desktop} {
		color: ${text.commentCountWide(format)};
		border-left: 1px solid ${border.commentCountWide(format)};
	}
	padding-top: ${remSpace[2]};
	margin-bottom: ${remSpace[2]};
	${darkModeCss`
		color: ${text.commentCountDark(format)};
		border-left: 1px solid ${border.commentCountDark(format)};

		${from.desktop} {
			border-left-color: ${border.commentCountWideDark(format)};
		}
	`}
`;

const deadblogStyles = css`
	border-left: none;
	padding-left: ${remSpace[3]};
	${from.phablet} {
		padding-left: ${remSpace[5]};
	}
	${from.desktop} {
		padding-left: 0;
		border-left: none;
	}
`;

const getStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return css(blogStyles(format));
		case ArticleDesign.DeadBlog:
			return css(blogStyles(format), deadblogStyles);
		default:
			return styles(format);
	}
};

const liveblogBubbleStyles = (format: ArticleFormat): SerializedStyles => css`
	${from.desktop} {
		fill: ${fill.commentCountWide(format)};
		${darkModeCss`
			fill: ${fill.commentCountDark(format)};
    	`}
	}
`;

const deadblogBubbleStyles = (format: ArticleFormat): SerializedStyles => css`
	fill: ${fill.commentCount(format)};
	margin-left: revert;
	${from.desktop} {
		fill: ${fill.commentCountWide(format)};
		${darkModeCss`
			fill: ${fill.commentCountDark(format)};
    	`}
	}
`;

const getBubbleStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return css(bubbleStyles(format), liveblogBubbleStyles(format));
		case ArticleDesign.DeadBlog:
			return css(bubbleStyles(format), deadblogBubbleStyles(format));
		default:
			return bubbleStyles(format);
	}
};

const CommentCount: FC<Props> = ({ count, commentable, ...format }: Props) => {
	if (!commentable) {
		return null;
	}

	return pipe(
		count,
		map((count: number) => (
			<button css={getStyles(format)}>
				<svg
					css={getBubbleStyles(format)}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 9 8"
				>
					<rect x="0" y="0" width="9" height="6" rx="1.2" />
					<polygon points="2,6 2,8 2.5,8 4,6" />
				</svg>
				{count.toLocaleString()}
			</button>
		)),
		withDefault(<></>),
	);
};

// ----- Exports ----- //

export default CommentCount;
