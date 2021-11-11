// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props extends ArticleFormat {
	count: Option<number>;
	commentable: boolean;
}

const styles = (
	colour: string,
	borderColor: string,
	darkBorderColour: string,
): SerializedStyles => css`
	${textSans.medium({ fontWeight: 'bold' })}
	border: none;
	background: none;
	border-left: 1px solid ${borderColor};
	padding-top: ${remSpace[3]};
	color: ${colour};
	${darkModeCss`
        border-left: 1px solid ${darkBorderColour};
    `}
`;

const bubbleStyles = (colour: string): SerializedStyles => css`
	width: 1rem;
	display: block;
	margin-left: auto;
	fill: ${colour};
`;

const blogStyles = (color: string): SerializedStyles => css`
	${styles(color, 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.4)')}

	${from.desktop} {
		color: ${neutral[46]};
		border-left: 1px solid ${neutral[86]};
	}
	padding-top: ${remSpace[2]};
	margin-bottom: ${remSpace[2]};
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

const getStyles = ({ theme, design }: ArticleFormat): SerializedStyles => {
	const colours = getThemeStyles(theme);

	switch (design) {
		case ArticleDesign.LiveBlog:
			return blogStyles(neutral[93]);
		case ArticleDesign.DeadBlog:
			return css(blogStyles(colours.link), deadblogStyles);
		default:
			return styles(colours.kicker, border.secondary, neutral[20]);
	}
};

const liveblogBubbleStyles = (color: string): SerializedStyles => css`
	${from.desktop} {
		fill: ${color};
	}
`;

const deadblogBubbleStyles = (
	color: string,
	desktopColor: string,
): SerializedStyles => css`
	fill: ${color};
	margin-left: revert;
	${from.desktop} {
		fill: ${desktopColor};
	}
`;

const getBubbleStyles = ({
	theme,
	design,
}: ArticleFormat): SerializedStyles => {
	const colours = getThemeStyles(theme);

	switch (design) {
		case ArticleDesign.LiveBlog:
			return css(
				bubbleStyles(neutral[93]),
				liveblogBubbleStyles(neutral[46]),
			);
		case ArticleDesign.DeadBlog:
			return css(
				bubbleStyles(neutral[93]),
				deadblogBubbleStyles(colours.link, neutral[46]),
			);
		default:
			return bubbleStyles(colours.kicker);
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
