import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '../../articleFormat';
import { remSpace } from '@guardian/source/foundations';
import { background, text } from 'palette';
import type { ReactNode } from 'react';
import { darkModeCss } from 'styles';

const ArticleBodyStyles = (format: ArticleFormat): SerializedStyles => css`
	position: relative;
	clear: both;
	background: ${background.mediaArticleBody(format)};
	color: ${text.mediaArticleBody(format)};
`;

const ArticleBodyDarkStyles = (
	format: ArticleFormat,
): SerializedStyles => darkModeCss`
    a {
        color: ${text.mediaArticleBodyLinkDark(format)};
    }
    p:last-child {
        margin-bottom: 0;
        padding-bottom: ${remSpace[3]};
    }
`;

interface ArticleBodyProps {
	className: SerializedStyles[];
	children: ReactNode[];
	format: ArticleFormat;
}

const ArticleBodyMedia = ({
	className,
	children,
	format,
}: ArticleBodyProps) => (
	<div
		css={[
			ArticleBodyStyles(format),
			ArticleBodyDarkStyles(format),
			...className,
		]}
	>
		{children}
	</div>
);

export default ArticleBodyMedia;
