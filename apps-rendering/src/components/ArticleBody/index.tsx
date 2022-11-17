import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

interface ArticleBodyProps {
	className?: SerializedStyles[];
	children: ReactNode[];
	format: ArticleFormat;
}

const ArticleBodyStyles = (format: ArticleFormat): SerializedStyles => css`
	position: relative;
	clear: both;
	color: ${text.body(format)};

	iframe {
		width: 100%;
		border: none;
	}

	twitter-widget,
	figure[data-atom-type='explainer'] {
		margin: ${remSpace[4]} 0;
		clear: both;
		display: inline-block;
	}
`;
const ArticleBodyDarkStyles = (
	format: ArticleFormat,
): SerializedStyles => darkModeCss`

	color: ${text.bodyDark(format)};

    figcaption {
        color: ${neutral[60]};
    }

    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }
`;

const ArticleBody: FC<ArticleBodyProps> = ({ className, children, format }) => {
	const classNames = className ? className : [];
	return (
		<div
			css={[
				ArticleBodyStyles(format),
				ArticleBodyDarkStyles(format),
				...classNames,
			]}
		>
			{children}
		</div>
	);
};

export default ArticleBody;
