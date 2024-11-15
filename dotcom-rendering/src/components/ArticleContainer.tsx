import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';

type Props = {
	format: ArticleFormat;
	children: React.ReactNode;
};

const articleWidth = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Picture:
			//This enables the straight lines and submeta in picture content to correctly "stretch" in the container.
			return null;
		case ArticleDesign.Interactive: {
			/* These articles use a special template which manages its own width */
			return null;
		}
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			return css`
				${from.desktop} {
					width: 700px;
				}
			`;
		}
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return css`
				${from.desktop} {
					width: 620px;
				}
				/* Make the video player as wide as possible on larger screens */
				${from.wide} {
					width: 100%;
				}
			`;
		default: {
			return css`
				${from.desktop} {
					width: 620px;
				}
			`;
		}
	}
};

const articleWrapper = css`
	${until.leftCol} {
		/* below 1140 */
		padding-left: 0;
	}

	flex-grow: 1;

	/* Due to MainMedia using position: relative, this seems to effect the rendering order
		To mitigate we use z-index
		TODO: find a cleaner solution */
	z-index: 1;
`;

export const ArticleContainer = ({ children, format }: Props) => {
	return <div css={[articleWrapper, articleWidth(format)]}>{children}</div>;
};
