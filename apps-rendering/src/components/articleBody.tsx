import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import { ArticleDesign, ArticleFormat } from '@guardian/libs';
import { background, neutral, remSpace, space } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';
import { adStyles, darkModeCss } from 'styles';

interface ArticleBodyProps {
	className?: SerializedStyles[];
	children: ReactNode[];
	format: ArticleFormat;
}

const dropCapWeight = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return css`font-weight: 200;
			`;
		default:
			return css`
				font-weight: 700;
			`;
	}
}
const ArticleBodyStyles = (format: ArticleFormat): SerializedStyles => {
	const baseStyles = css`
	position: relative;
	clear: both;

	iframe {
		width: 100%;
		border: none;
	}

	${adStyles(format)}

	twitter-widget,
    figure[data-atom-type="explainer"] {
		margin: ${remSpace[4]} 0;
		clear: both;
		display: inline-block;
	}
	`;

	const dropCap = css`
		p:first-child:first-letter {
		color: ${text.dropCap(format)};
		${dropCapWeight(format)};
		float: left;
		font-size: 7.375rem;
		line-height: 6.188rem;
		vertical-align: text-top;
		pointer-events: none;
		margin-right: ${space[1]}px;
		}
	`;

	switch (format.design) {
		case ArticleDesign.Interview:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
			return css`
				${baseStyles}
				${dropCap}
			`;
		default:
			return baseStyles;
			}
};

const ArticleBodyDarkStyles: SerializedStyles = darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

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
				ArticleBodyDarkStyles,
				...classNames,
			]}
		>
			{children}
		</div>
	);
};

export default ArticleBody;
